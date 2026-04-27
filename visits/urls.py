from django.urls import path
from .views import VisitRequestCreateView, AgentVisitListView, VisitRequestUpdateView

urlpatterns = [
    path('create/', VisitRequestCreateView.as_view()),
    path('my-visits/', AgentVisitListView.as_view()),
    path('<int:pk>/', VisitRequestUpdateView.as_view()),
]