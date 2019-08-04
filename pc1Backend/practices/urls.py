from django.urls import path, include
from practices import views 
from rest_framework.authtoken.views import obtain_auth_token

app_name = "practices"

urlpatterns = [
	path('entities/', views.EntityList.as_view(), name="entity_list"),
	path('entities/<slug:slug>/', views.EntityDetail.as_view(), name="entity_detail"),
	path('practices/<slug:slug>/', views.PracticeDetail.as_view(), name='practice_detail'),
	path('daily_summaries/', views.FilteredDailySummaries.as_view(), name='daily_summaries'),
	path('daily_summaries/<int:pk>/', views.DailySummaryDetail.as_view(), name="daily_summary_detail"),
	path('summary_overviews/', views.SummaryOverviewView.as_view(), name="summary_overview"),
	path('providers/', views.ProviderList.as_view()),
	path('providers/<int:pk>', views.ProviderDetail.as_view()),
	path('specialties/', views.SpecialtyList.as_view()),
	path('users/', views.UserCreate.as_view(), name="user_detail"),
	path('token/', views.CreateTokenView.as_view(), name='create_token'),
]