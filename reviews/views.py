from rest_framework import generics, permissions
from .models import Review
from .serializers import ReviewSerializer


class AgentReviewListView(generics.ListAPIView):
    """Public: all reviews for one agent, with average rating."""
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Review.objects.filter(agent_id=self.kwargs['agent_id'])

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        avg = qs.aggregate(avg=__import__('django.db.models', fromlist=['Avg']).Avg('rating'))['avg']
        data = self.get_serializer(qs, many=True).data
        return __import__('rest_framework.response', fromlist=['Response']).Response({
            'average_rating': round(avg, 2) if avg else None,
            'count': qs.count(),
            'results': data,
        })


class ReviewCreateView(generics.CreateAPIView):
    """Authenticated: create a review."""
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReviewUpdateView(generics.UpdateAPIView):
    """Author only: update their review."""
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(reviewer=self.request.user)