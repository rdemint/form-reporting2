import decimal
import datetime
from calendar import monthrange
from practices.models import DailySummary
from django.db.models import Avg
from django_filters import rest_framework as filters
from practices.utils import TwoDecimals

class SummaryOverview:
	# This class is responsible for taking a filtered queryset and creating an overview
	# either for each month of the year, or each day of the month.  
	def __init__(self, qs, dateView, dateFilter, dateFilterRef):
		self.date_filter = dateFilter
		self.date_filter_ref = dateFilterRef
		if dateFilter is not None:
			if dateView == 'mtd':
				self.overview_type = "daily"
				self.qs = qs.filter(date__day=dateFilter)
			elif dateView == 'ytd':
				self.overview_type = "monthly"
				self.qs = qs.filter(date__month=dateFilter)
		else:
			self.qs = qs
		
	def count(self):
		return self.qs.count()

	def visits(self):
		return self.qs.aggregate(average=(TwoDecimals(Avg('visits'))))

	def visits_per_workdays(self):
		return self.qs.aggregate(average=(TwoDecimals(Avg('visits')) / Avg('workdays')))

	def noshows(self):
		return self.qs.aggregate(average=(TwoDecimals(Avg('noshows'))))

	def workdays(self):
		return self.qs.aggregate(average=(TwoDecimals(Avg('workdays'))))

	def to_dict(self):
		return {
		'overview_type': self.overview_type,
		'date_filter': self.date_filter,
		'date_filter_ref': self.date_filter_ref,
		'summary_count': self.count(),
		'visits': self.visits(),
		'visits_per_workdays': self.visits_per_workdays(),
		'noshows': self.noshows(),
		'workdays': self.workdays()
		}

class SummaryOverviewManager:
	def __init__(self, qs, request):
		self.qs = qs
		self.dateView = None
		self.today = datetime.datetime.today()
		self.request = request
		if 'month' in request.GET:
			self.selected_month = int(request.GET['month'])
		if 'year' in request.GET:
			self.selected_year = int(request.GET['year'])

	def mtdOverviews(self):
		#Includes only past days of current month, or all days of previous months
		self.dateView = 'mtd'
		if self.selected_month==self.today.month:
			self.dateRange = self.today.day
		else:
			self.dateRange = monthrange(self.selected_year, self.selected_month)[1]
		return self.createOverviews()

	def ytdOverviews(self):
		#Includes only up to current month of the year
		self.dateView = 'ytd'
		self.dateRange = self.today.month
		return self.createOverviews()

	def createDateFilterRef(self, date_i):
		# i.e. Show Jan, Feb styling for months of 'ytd' and 1, 2, 3 styling for days of 'mtd'
		if self.dateView == 'ytd':
			return datetime.date(self.selected_year, date_i, 1).strftime('%b')
		elif self.dateView == 'mtd':
			return datetime.date(self.selected_year, self.selected_month, date_i).strftime("%d")

	def createOverviews(self):
		overviews = []
		for date_i in range(1, self.dateRange + 1):
			dateFilterRef = self.createDateFilterRef(date_i)
			summaryOverview = SummaryOverview(self.qs, self.dateView, date_i, dateFilterRef)
			overviews.append(summaryOverview.to_dict())
		return overviews

# class OrgSummaryOverviewManager:
# 	#this is would be responsible for creating a single response object for an organization
# 	#this would allow front end to hit the server once, to retrieve all overviews
# 	#instead of a hit for each practice, provider, specialty per org.  
# 	# IMPORTANT - would require removal of the filterset filtering in the view and implementation
# 	# of that filtering within the summary overview manager
# 	def __init__(org):
# 		self.overviews = []
# 		self.overviews.append(self.handleSpecialties())
# 		self.overviews.append(self.handleProviders())
# 		if org.type == "entity":
# 			self.overviews.append(self.handlePractices())

# 	def handleSpecialties(self):
# 		for specialty in org.specialties:
# 			#Create SummaryOverviewManager for specialty
# 			pass

# 	def handleProviders(self):
# 		for provider in org.providers:
# 			pass

# 	def handlePractices(self):
# 		for practice in org.practices:
# 			pass