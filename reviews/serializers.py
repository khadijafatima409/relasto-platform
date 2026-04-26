from rest_framework import serializers
from .models import Review
from accounts.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'agent', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'reviewer', 'created_at']

    def validate(self, data):
        request = self.context['request']
        agent = data.get('agent')
        if agent == request.user:
            raise serializers.ValidationError("You cannot review yourself.")
        return data

    def create(self, validated_data):
        return Review.objects.create(reviewer=self.context['request'].user, **validated_data)