import decimal
from practices.models import DailySummary
from django.db.models import Avg 
from django_filters import rest_framework as filters
from practices.utils import TwoDecimals


class SummaryOverview:
	# This class is responsible for taking a filtered queryset and creating an overview
	# either for each month of the year, or each day of the month.  
	def __init__(self, qs, timeFilter, timeIndex):
		if timeFilter == 'mtd':
			self.qs = qs.filter(date__day=timeIndex)

		if timeFilter == 'ytd':
			self.qs = qs.filter(date__month = timeIndex)
		# sourceFilter would be practice, specialty, provider
		
	def count(self):
		return self.qs.count()

	def visits(self):
		return self.qs.aggregate(average = (TwoDecimals(Avg('visits'))))

	def visits_per_workdays(self):
		return self.qs.aggregate(average= (TwoDecimals(Avg('visits')/Avg('workdays'))))

	def noshows(self):
		return self.qs.aggregate(average = (TwoDecimals(Avg('noshows'))))

	def workdays(self):
		return self.qs.aggregate(average = (TwoDecimals(Avg('workdays'))))

	def to_dict(self):
		return {
		'count': self.count(),
		'visits': self.visits(),
		'visits_per_workdays': self.visits_per_workdays(),
		'noshows': self.noshows()
		}