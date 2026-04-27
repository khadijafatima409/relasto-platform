from rest_framework import generics, permissions
from .models import VisitRequest
from .serializers import VisitRequestSerializer


class VisitRequestCreateView(generics.CreateAPIView):
    """Any authenticated user can submit a visit request."""
    serializer_class = VisitRequestSerializer
    permission_classes = [permissions.IsAuthenticated]


class AgentVisitListView(generics.ListAPIView):
    """Agent sees all their visit requests."""
    serializer_class = VisitRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return VisitRequest.objects.filter(agent=self.request.user)


class VisitRequestUpdateView(generics.UpdateAPIView):
    """Agent can update status of their requests."""
    serializer_class = VisitRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return VisitRequest.objects.filter(agent=self.request.user)