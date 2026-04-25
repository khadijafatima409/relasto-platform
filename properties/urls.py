from django.urls import path
from .views import (
    PropertyListView, PropertyCreateView, PropertyDetailView,
    AgentPropertyListView, PropertyImageUploadView, PropertyFeatureView,
)

urlpatterns = [
    path('', PropertyListView.as_view(), name='property_list'),
    path('create/', PropertyCreateView.as_view(), name='property_create'),
    path('<slug:slug>/', PropertyDetailView.as_view(), name='property_detail'),
    path('<slug:slug>/images/', PropertyImageUploadView.as_view(), name='property_images'),
    path('<slug:slug>/features/', PropertyFeatureView.as_view(), name='property_features'),
    path('agent/<int:agent_id>/', AgentPropertyListView.as_view(), name='agent_properties'),
]