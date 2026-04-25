from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already registered.')
        return value

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError('Passwords do not match.')
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'phone', 'address', 'city', 'state', 'country', 'avatar']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'is_agent', 'profile']
        read_only_fields = ['id', 'email', 'is_agent']


class UserUpdateSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['username', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        # update user fields
        instance.username = validated_data.get('username', instance.username)
        instance.save()
        # update nested profile
        profile = instance.profile
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()
        return instance