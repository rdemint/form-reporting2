import decimal
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.utils.text import slugify
from django.shortcuts import get_object_or_404
from django.conf import settings
from datetime import datetime

# Create your models here.
class Entity(models.Model):
	org_type = models.CharField(max_length=50, default="entity")
	name = models.CharField(max_length=200)
	slug = models.SlugField(unique=True)

	def has_object_read_permission(self, request):
		print('checking permissions')
		print('user: {}'.format(request.user.entity.id))
		print('entity: {}'.format(self.id))
		return str(request.user.entity.id) == str(self.id)

	# def has_object_write_permission(self, request):
	# 	if request.user.type == "Admin" or request.user.type == "Manager":
	# 		return True
	# 	else:
	# 		return False

	@property
	def specialties(self):
		qs = Specialty.objects.filter(providers__entity=self).all()
		specialtySet = set(qs)
		return specialtySet
	
	def save(self, *args, **kwargs):
		self.org_type = 'entity'
		self.slug=slugify(self.name)
		super().save(*args, **kwargs)

	def __str__(self):
		return  self.name

	class Meta:	
		ordering=['name']


class Practice(models.Model):
	org_type = models.CharField(max_length=50, default="practice")
	name = models.CharField(max_length=200)
	slug = models.SlugField(unique=True)
	entity = models.ForeignKey(to=Entity, on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='practices')


	def has_object_read_permission(self, request):
		return str(request.user.practice.id) == str(self.id)

	def has_object_write_permission(self, request):
		if str(request.user.practice.id) == str(self.id) or request.user.type == "-":
			return True
		else:
			return False

	@property
	def specialties(self):
		qs = Specialty.objects.filter(providers__practices=self).all()
		specialtySet = set(qs)
		return specialtySet

	def save(self, *args, **kwargs):
		self.org_type = "practice"
		if self.entity == "None" or self.entity=="":
			self.entity = None
		self.slug=slugify(self.name)
		super().save(*args, **kwargs)

	#https://stackoverflow.com/questions/28163556/how-do-you-filter-a-nested-serializer-in-django-rest-framework
	def daily_summaries_by_month(self):
		return DailySummary.objects.filter(practice=self, date__year=self.request.GET('year', None), date__month=self.request.GET('month', None))

	def __str__(self):
		return self.name

	# @staticmethod
	# def has_read_permission(request):
	# 	print('request.kwargs: {}'.format(request.kwargs))
	# 	return True

	# def has_object_read_permission(self, request):
	# 	return request.user in self.users.all()

	class Meta:
		ordering=['name']


class UserManager(BaseUserManager):

	def create_user(self, email, password=None, **kwargs):
		user = self.model(email=self.normalize_email(email), **kwargs)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, password):
		superuser = self.create_user(email, password)
		superuser.is_staff = True
		superuser.is_superuser = True
		superuser.save(using=self._db)
		return superuser


class User(AbstractBaseUser, PermissionsMixin):
	TYPE_CHOICES = (
	('doctor', 'Doctor'),
	('staff', 'Staff'),
	('manager', 'Manager'),
	('admin', 'Admin'))
	first_name = models.CharField(max_length=100)
	last_name = models.CharField(max_length=100)
	user_type = models.CharField(choices=TYPE_CHOICES, max_length=100)
	practice = models.ForeignKey(Practice, on_delete=models.CASCADE,
		related_name='users', null=True, default=None, blank=True)
	entity = models.ForeignKey(Entity, on_delete=models.CASCADE, 
		related_name='users', null=True, blank=True)
	email = models.EmailField(max_length=255, unique=True)
	#the following two are required for custom user models 
	#as stated by the django docs
	is_staff = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)

	objects=UserManager()
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []
	
	def __str__(self):
		return self.first_name + " " + self.last_name


class Specialty(models.Model):
	name = models.CharField(max_length=150, unique=True)
	slug = models.SlugField(null=False)

	@staticmethod
	def has_read_permission(request):
		# Ensures users cannot view specialty data if they are not registered
		return True

	@staticmethod
	def has_write_permission(request):
		# Ensures users cannot view practice data they are not affiliated with
		return request.user.type == '-'

	def save(self, *args, **kwargs):
		self.slug = slugify(self.name)
		super().save(*args, **kwargs)

	def __str__(self):
		return self.name


	class Meta: 
		ordering=['name']

class Provider(models.Model):
	first_name = models.CharField(max_length=256)
	last_name = models.CharField(max_length=256)
	slug = models.SlugField(default=None, null=True, max_length=256)
	credentials = models.CharField(null=True, max_length=256)
	alias_1 = models.CharField(null=True, blank=True, max_length=256)
	alias_2 = models.CharField(null=True, blank=True, max_length=256)
	practices = models.ManyToManyField(Practice, related_name="providers")
	entity = models.ForeignKey(
		Entity,
		on_delete=models.CASCADE,
		related_name="providers",
		null=True,
		blank=True)
	specialties = models.ManyToManyField(Specialty, related_name='providers')
	visits_goal = models.IntegerField(default=20)
	
	@staticmethod
	def has_read_permission(request):
		if 'practice' in request.GET:
			return str(request.user.practice.id) == request.GET['practice']
		else:
			return False

	@staticmethod
	def has_write_permission(request):
		if 'practice' in request.POST:
			return request.user.practice.id == request.POST['practice']
		else:
			return False

	def has_object_read_permission(self, request):
		print(request.user.practice)
		print(self.practices.all())
		return request.user.practice in self.practices.all()

	def has_object_write_permission(self, request):
		return request.user.practice in self.practices.all()

	def __str__(self):
		return "{} {}, {}".format(self.first_name, self.last_name, self.credentials)

	@property 
	def name(self):
		return "{}, {} {}".format(self.last_name, self.first_name, self.credentials)

	def save(self, *args, **kwargs):
		super().save(*args, **kwargs)
		print(Provider.objects.filter(first_name=self.first_name, last_name = self.last_name))
		#Manual check for a unique first_name, last_name and practice
		#Since many2many field cannot be added to unique_together constraint
		providers = Provider.objects.filter(first_name=self.first_name, last_name = self.last_name)
		practices = []
		if len(providers) > 1:
			for provider in providers:
				for practice in provider.practices.all():
					practices.append(practice)
		if len(practices) != len(set(practices)):
			print('duplicate provider')
			raise ValueError:
				print('There are duplicate providers: {}'.format(providers))
			
	class Meta:
		ordering=['last_name']


class DailySummary(models.Model):
	submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True, blank=True)
	practice = models.ForeignKey(Practice, on_delete=models.CASCADE, related_name="daily_summaries")
	entity = models.ForeignKey(Entity, null=True, default=None, on_delete=models.CASCADE, related_name="daily_summaries")
	specialty = models.ForeignKey(Specialty, null=True, on_delete=models.CASCADE, related_name="daily_summaries")
	date = models.DateField(null=True)
	submitted_on = models.DateTimeField(null=True, blank=True, auto_now_add=True)
	visits = models.IntegerField(null=False)
	workdays = models.IntegerField(null=False)
	noshows = models.IntegerField(null=True)
	provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name="daily_summaries")
	last_updated = models.DateTimeField(auto_now=True)
	objects = models.Manager()

	@staticmethod
	def has_read_permission(request):
		# Ensures users cannot view practice data they are not affiliated with
		if 'practice' in request.GET:
			return str(request.user.practice.id) == str(request.GET['practice'])
		else:
			return False
	
	@staticmethod
	def has_write_permission(request):
		# Ensures users cannot view practice data they are not affiliated with
		if 'practice' in request.GET:
			return str(request.user.practice.id) == str(request.GET['practice'])
		else: 
			return False

	def has_object_read_permission(self, request):
		return str(request.user.practice.id) == str(self.practice.id)

	def has_object_write_permission(self, request):
		return str(request.user.practice.id) == str(self.practice.id)

	@property
	def visits_per_workdays(self):
		return round(decimal.Decimal(self.visits/self.workdays), 1)
	
	@property
	def edited(self):
		if self.submitted_on == self.last_updated and self.last_updated != None:
			return False
		elif self.submitted_on != self.last_updated and self.last_updated != None:
			return True 
		else:
			return False

	def save(self, *args, **kwargs):
		#automatically set entity
		if self.practice.entity:
			self.entity = self.practice.entity
		#last resort guard ensuring the related relationship already exist
		if self.provider in self.practice.providers.all() and self.specialty in self.provider.specialties.all():
			super().save(*args, **kwargs)
		else:
			raise Exception('There is a problem with the relationships between the Practice, Provider, and Specialty.  The related relationships for your selection do not exist.')

	def __str__(self):
		return self.practice.__str__() + ': Daily for ' + self.date.strftime('%A') +', ' + self.date.strftime('%m/%d/%Y')

	class Meta:
		unique_together = (('date', 'provider', 'specialty'))
		ordering=['date']


class Collection(models.Model):
	submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True, blank=True)
	practice = models.ForeignKey(Practice, on_delete=models.CASCADE, related_name="collections")
	entity = models.ForeignKey(Entity, null=True, default=None, on_delete=models.CASCADE, related_name="collections")
	date = models.DateField(null=True)
	submitted_on = models.DateTimeField(null=True, blank=True, auto_now_add=True)
	last_updated = models.DateTimeField(auto_now=True)
	amount = models.DecimalField(max_digits=7, decimal_places=2, default=None)

	class Meta:
		unique_together = (('date', 'practice'))
		ordering=['date']

	def save(self, *args, **kwargs):
		#automatically set entity
		if self.practice.entity:
			self.entity = self.practice.entity
		super().save(*args, **kwargs)
