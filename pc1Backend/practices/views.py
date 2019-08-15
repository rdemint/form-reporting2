from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings
from practices.models import Collection, Practice, DailySummary, User, Entity, Provider, Specialty
from practices.serializers import CollectionSerializer, DailySummarySerializer, ProviderSerializer, SpecialtySerializer, EntitySerializer, PracticeSerializer, AuthTokenSerializer, UserSerializer
from practices.overviews import SummaryOverviewManager
from django_filters import rest_framework as filters
from datetime import datetime
from dry_rest_permissions.generics import DRYObjectPermissions, DRYPermissions, DRYGlobalPermissions

class DailySummaryFilter(filters.FilterSet):
	month = filters.NumberFilter(field_name="date", lookup_expr="month")
	year = filters.NumberFilter(field_name="date", lookup_expr="year")
	entity = filters.NumberFilter(field_name="entity__id", lookup_expr="iexact")
	practice = filters.NumberFilter(field_name="practice__id", lookup_expr="iexact")
	provider = filters.NumberFilter(field_name="provider__id", lookup_expr='iexact')
	specialty = filters.NumberFilter(field_name="specialty__id", lookup_expr='iexact')

	class Meta:
		model = DailySummary
		fields = ['month', 'year', 'entity', 'practice', 'provider']


class FilteredDailySummaries(ListCreateAPIView):
	queryset = DailySummary.objects.all()
	serializer_class = DailySummarySerializer
	# filter_backends = (filters.DjangoFilterBackend,)
	# filterset_class = DailySummaryFilter
	permission_classes = (DRYGlobalPermissions,)

class DailySummaryDetail(RetrieveUpdateDestroyAPIView):
	queryset = DailySummary.objects.all()
	serializer_class = DailySummarySerializer
	permission_classes = (DRYObjectPermissions,)


class CollectionFilter(filters.FilterSet):
	month = filters.NumberFilter(field_name="date", lookup_expr="month")
	year = filters.NumberFilter(field_name="date", lookup_expr="year")
	entity = filters.NumberFilter(field_name="entity__id", lookup_expr="iexact")
	practice = filters.NumberFilter(field_name="practice__id", lookup_expr="iexact")
	provider = filters.NumberFilter(field_name="provider__id", lookup_expr='iexact')
	specialty = filters.NumberFilter(field_name="specialty__id", lookup_expr='iexact')

	class Meta:
		model = Collection
		fields = ['month', 'year', 'entity', 'practice', 'provider', 'specialty']


class FilteredCollections(ListCreateAPIView):
	queryset = Collection.objects.all()
	serializer_class = CollectionSerializer
	filter_backends = (filters.DjangoFilterBackend,)
	filterset_class = CollectionFilter
	

class CollectionDetail(RetrieveUpdateDestroyAPIView):
	queryset = DailySummary.objects.all()
	serializer_class = CollectionSerializer
	


class SummaryOverviewView(APIView):
	filter_backends = (filters.DjangoFilterBackend,)
	filterset_class = DailySummaryFilter

	def filter_queryset(self, queryset):
		for backend in list(self.filter_backends):
			queryset = backend().filter_queryset(self.request, queryset, self)
		return queryset

	def get(self, request, format=None):	
		qs = self.filter_queryset(DailySummary.objects.all())
		#permissions - ensures user is affiliated with the entity or practice
		# before proceeding with the response
		if 'entity' in request.GET:
			if str(request.user.entity.id) == str(request.GET['entity']):
				pass
			else:
				return Response(data="Server could not authenticate: That user is not associated with the entity")
		elif 'practice' in request.GET:
			if str(request.user.practice.id) == str(request.GET['practice']):
				pass
			else:
				return Response(status=403, data="Server could not authenticate: That user is not associated with the entity")
		else:
			return Response(status=403, data="Forbidden because no practice id parameter provided - This is required for authentication")

		if 'month' in request.GET:
			manager = SummaryOverviewManager(qs, request)
			return Response(manager.mtdOverviews())
		else:
			manager = SummaryOverviewManager(qs, request)
			return Response(manager.ytdOverviews())
			

class EntityList(ListCreateAPIView):
	serializer_class = EntitySerializer
	queryset = Entity.objects.all()


class EntityDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = EntitySerializer 
	lookup_field = "slug"
	permission_classes = (DRYObjectPermissions,)

	def get_queryset(self):
		return Entity.objects.filter(slug=self.kwargs.get('slug'))


class PracticeDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = PracticeSerializer
	lookup_field = "slug"
	permission_classes = (DRYObjectPermissions,)

	def get_queryset(self):
		return Practice.objects.filter(slug=self.kwargs.get('slug'))

class UserCreate(CreateAPIView):
	serializer_class = UserSerializer
	queryset = User.objects.all()


class ProviderFilter(filters.FilterSet):
	practice = filters.NumberFilter(field_name="practices__id", lookup_expr="iexact")
	provider = filters.NumberFilter(field_name="provider__id", lookup_expr='iexact')
	specialty = filters.NumberFilter(field_name="specialties__id", lookup_expr='iexact')
	entity = filters.NumberFilter(field_name="entity__id", lookup_expr='iexact')

	class Meta:
		model = Provider
		fields = ['practice', 'provider', 'specialty', 'entity']


class ProviderList(ListCreateAPIView):
	filterset_class = ProviderFilter
	serializer_class = ProviderSerializer
	queryset = Provider.objects.all()
	permission_classes = (DRYGlobalPermissions,)	

	def get_queryset(self):		
		if self.kwargs.get('practice'):
			return Provider.objects.filter(practices__id=self.kwargs.get('practice'))
		else:
			return Provider.objects.all()


class ProviderDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = ProviderSerializer
	queryset = Provider.objects.all()
	permission_classes = (DRYObjectPermissions,)

class SpecialtyList(ListCreateAPIView):
	serializer_class = SpecialtySerializer
	queryset = Specialty.objects.all()
	permission_classes = (DRYGlobalPermissions,)

class CreateTokenView(ObtainAuthToken):
	serializer_class = AuthTokenSerializer
	renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

	def post(self, request, *args, **kwargs):
		print('running POST')
		serializer = self.serializer_class(data=request.data, context={'request': request})
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data['user']
		if user.practice is None and user.entity is not None:
			entity_slug = user.entity.slug
			entity_name = user.entity.name
			entity_id = user.entity.id
			practice_slug = None
			practice_name = None
			practice_id = None
			org_type = user.entity.org_type
		elif user.practice is not None and user.entity is None: 
			practice_slug = user.practice.slug
			practice_name = user.practice.name
			practice_id = user.practice.id			
			entity_name = None
			entity_slug = None
			entity_id = None
			org_type = user.practice.org_type
		token, created = Token.objects.get_or_create(user=user)
		return Response(
			{
			'token': token.key, 
			'practice_slug': practice_slug,
			'entity_slug': entity_slug, 
			'email': user.email, 
			'practice_name': practice_name,
			'entity_name': entity_name, 
			'practice_id': practice_id,
			'entity_id': entity_id,
			'user_type': user.user_type,
			'user_id': user.id,
			'org_type': org_type
			
			})
	
