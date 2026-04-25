from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    RegisterView,
    MeView,
    AgentListView,
    AgentDetailView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),
    path('agents/', AgentListView.as_view(), name='agent_list'),
    path('agents/<int:pk>/', AgentDetailView.as_view(), name='agent_detail'),
]