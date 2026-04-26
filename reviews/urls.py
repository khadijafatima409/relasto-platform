from django.urls import path
from .views import AgentReviewListView, ReviewCreateView, ReviewUpdateView

urlpatterns = [
    path('agent/<int:agent_id>/', AgentReviewListView.as_view()),
    path('create/', ReviewCreateView.as_view()),
    path('<int:pk>/', ReviewUpdateView.as_view()),
]