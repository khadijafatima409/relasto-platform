from rest_framework import serializers
from .models import Property, PropertyImage, PropertyFeature
from accounts.serializers import UserSerializer


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'is_primary']


class PropertyFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyFeature
        fields = ['id', 'key', 'value']


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    features = PropertyFeatureSerializer(many=True, read_only=True)
    agent = UserSerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = [
            'id', 'slug', 'title', 'description', 'price', 'property_type',
            'status', 'address', 'city', 'state', 'country',
            'bedrooms', 'bathrooms', 'area',
            'agent', 'images', 'features', 'primary_image',
            'created_at',
        ]
        read_only_fields = ['id', 'slug', 'agent', 'created_at']

    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first()
        if img:
            request = self.context.get('request')
            return request.build_absolute_uri(img.image.url) if request else img.image.url
        return None


class PropertyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            'title', 'description', 'price', 'property_type',
            'status', 'address', 'city', 'state', 'country',
            'bedrooms', 'bathrooms', 'area',
        ]

    def create(self, validated_data):
        # agent is always the logged-in user
        return Property.objects.create(agent=self.context['request'].user, **validated_data)