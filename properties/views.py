from rest_framework import generics, permissions, parsers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Property, PropertyImage, PropertyFeature
from .serializers import (
    PropertySerializer, PropertyCreateSerializer,
    PropertyImageSerializer, PropertyFeatureSerializer,
)
from .filters import PropertyFilter
from .permissions import IsOwnerOrReadOnly


class PropertyListView(generics.ListAPIView):
    """Public: list + search + filter properties."""
    serializer_class = PropertySerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = PropertyFilter
    search_fields = ['title', 'description', 'city', 'state']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        return Property.objects.select_related('agent', 'agent__profile').prefetch_related('images', 'features')


class PropertyCreateView(generics.CreateAPIView):
    """Authenticated only: create property."""
    serializer_class = PropertyCreateSerializer
    permission_classes = [permissions.IsAuthenticated]


class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Public read; owner write/delete."""
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return PropertyCreateSerializer
        return PropertySerializer

    def get_queryset(self):
        return Property.objects.select_related('agent', 'agent__profile').prefetch_related('images', 'features')


class AgentPropertyListView(generics.ListAPIView):
    """Public: all properties belonging to one agent."""
    serializer_class = PropertySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        agent_id = self.kwargs['agent_id']
        return Property.objects.filter(agent_id=agent_id).prefetch_related('images', 'features')


class PropertyImageUploadView(APIView):
    """Upload images to a property (owner only)."""
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def post(self, request, slug):
        prop = Property.objects.get(slug=slug, agent=request.user)
        images = request.FILES.getlist('images')
        make_primary = request.data.get('is_primary', 'false').lower() == 'true'
        created = []
        for idx, img in enumerate(images):
            is_primary = make_primary and idx == 0
            obj = PropertyImage.objects.create(property=prop, image=img, is_primary=is_primary)
            created.append(obj)
        return Response(PropertyImageSerializer(created, many=True).data, status=status.HTTP_201_CREATED)


class PropertyFeatureView(APIView):
    """Add or remove features from a property (owner only)."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, slug):
        prop = Property.objects.get(slug=slug, agent=request.user)
        key = request.data.get('key')
        value = request.data.get('value')
        feature, _ = PropertyFeature.objects.update_or_create(
            property=prop, key=key, defaults={'value': value}
        )
        return Response(PropertyFeatureSerializer(feature).data)

    def delete(self, request, slug):
        prop = Property.objects.get(slug=slug, agent=request.user)
        key = request.data.get('key')
        PropertyFeature.objects.filter(property=prop, key=key).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)