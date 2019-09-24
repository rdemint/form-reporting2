from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from practices.models import Collection, Practice, DailySummary, User, Entity, Provider, Specialty
from django.contrib.auth import get_user_model, authenticate


# class MonthlyOverviewSerializer(serializers.Serializer):
# 	visits = serializers.DecimalField(max_digits=2, decimal_places=2)
# 	workdays = serializers.DecimalField(max_digits=2, decimal_places=2)
# 	visits_per_workdays = serializers.DecimalField(max_digits=2, decimal_places=2)

class SpecialtySerializer(serializers.ModelSerializer):
	class Meta:
		model = Specialty 
		fields = "__all__"
	

class DailySummarySerializer(serializers.ModelSerializer):
	practice = serializers.PrimaryKeyRelatedField(many=False, queryset=Practice.objects.all())
	provider = serializers.PrimaryKeyRelatedField(many=False, queryset=Provider.objects.all())
	specialty = serializers.PrimaryKeyRelatedField(many=False, queryset=Specialty.objects.all())
	submitted_on = serializers.DateTimeField(format="%m-%d-%y", read_only=True)
	last_updated = serializers.DateTimeField(format="%m-%d-%y", read_only=True)
	visits_per_workdays = serializers.ReadOnlyField()

	class Meta:
		model = DailySummary
		fields = ('id', 'date', 'submitted_on', 'last_updated', 'submitted_by', 'entity', 'practice', 'provider', 'specialty', 'visits', 
			'workdays', 'noshows', 'visits_per_workdays')
		validators=[UniqueTogetherValidator(
				queryset=DailySummary.objects.all(),
				fields=('practice', 'date', 'specialty', 'provider'),
				message="A daily summary for this date, practice, specialty, and provider already exists.  Choose a new date or edit the existing summary."
			)
		]

class CollectionSerializer(serializers.ModelSerializer):
	practice = serializers.PrimaryKeyRelatedField(many=False, queryset=Practice.objects.all())
	entity = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
	submitted_on = serializers.DateTimeField(format="%m-%d-%y", read_only=True)
	last_updated = serializers.DateTimeField(format="%m-%d-%y", read_only=True)

	class Meta:
		model = Collection
		fields = ('id', 'amount','date', 'practice', 'entity', 'submitted_on', 'last_updated', 'submitted_by')
		# validators = [UniqueTogetherValidator(
		# 	queryset = Collection.objects.all(),
		# 	fields = ('date', 'practice'),
		# 	message = "A collection report for this date and practice already exists"
		# )]

class ProviderSerializer(serializers.ModelSerializer):
	practices = serializers.SlugRelatedField(slug_field="name", read_only=False, queryset=Practice.objects.all(), many=True)
	specialties = serializers.SlugRelatedField(slug_field="name", read_only=False, queryset=Specialty.objects.all(), many=True)

	# def create(self, validated_data):
	# 	# Overwrite is required to handle the m2m relationships for practices and specialties, 
	# 	# and fk relationship for entity
	# 	provider = super().create(**validated_data)	
	# 	for specialty in validated_data['specialties']:
	# 		provider.specialties.add(specialty)
	# 	#'practices' will only have one practice in it. 
	# 	practice = Practice.objects.get(id=validated_data['practices'])
	# 	provider.practices.add(practice)		
	# 	entity = practice.entity
	# 	provider.entity = entity
	# 	entity.providers.add(provider)
	# 	return provider


	class Meta:
		model = Provider	
		fields = ('id', 'name', 'slug', 'first_name', 'last_name', 'credentials', 
			'practices', 'specialties')


class PracticeSerializer(serializers.ModelSerializer):
	providers = ProviderSerializer(read_only=True, many=True)
	specialties = SpecialtySerializer(read_only=True, many=True)

	class Meta:
		model = Practice 
		fields = ('id', 'name', 'slug', 'entity', 'providers', 'specialties', 'org_type')


class EntitySerializer(serializers.ModelSerializer):
	practices = PracticeSerializer(many=True, read_only=True)
	providers = ProviderSerializer(many=True, read_only=True)
	specialties = SpecialtySerializer(many=True, read_only=True)

	class Meta:
		model = Entity
		fields = ('id', 'name', 'slug', 'providers', 'practices', 'specialties', 'org_type')


class AuthTokenSerializer(serializers.Serializer):
	email = serializers.CharField()
	password = serializers.CharField(
		style={'input_type': 'password'},
		trim_whitespace=False)

	def validate(self, attrs):
		print('HELLO')
		email=attrs.get('email')
		password=attrs.get('password')
		user = authenticate(
			request=self.context.get('request'),
			username=email,
			password=password
			)
		if not user:
			msg = ('Unable to login with that email and password')
			raise serializers.ValidationError(msg, code='authentication')

		attrs['user'] = user
		return attrs


class UserSerializer(serializers.ModelSerializer):
	class Meta: 
		model = get_user_model()
		fields = ('first_name', 'last_name', 'email', 'password', 'practice', 'entity', 'groups')
		extra_kwargs = {'password': {'write_only': True, 'min_length':5}}

	def create(self, validated_data):
		return get_user_model().objects.create_user(**validated_data)

