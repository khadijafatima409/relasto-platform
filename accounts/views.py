from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer, UserUpdateSerializer

User = get_user_model()


# Custom JWT payload — adds user info into the token
class CustomTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['is_agent'] = user.is_agent
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeView(APIView):
    """GET → return current user. PATCH → update current user."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserSerializer(request.user).data)


class AgentListView(generics.ListAPIView):
    """Public: list all agents, searchable by city/country."""
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = User.objects.filter(is_agent=True).select_related('profile')
        city = self.request.query_params.get('city')
        country = self.request.query_params.get('country')
        if city:
            qs = qs.filter(profile__city__icontains=city)
        if country:
            qs = qs.filter(profile__country__icontains=country)
        return qs


class AgentDetailView(generics.RetrieveAPIView):
    """Public: single agent profile."""
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.filter(is_agent=True).select_related('profile')