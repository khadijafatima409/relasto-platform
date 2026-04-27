from rest_framework import serializers
from .models import VisitRequest


class VisitRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitRequest
        fields = [
            'id', 'property', 'agent', 'full_name', 'email',
            'phone', 'preferred_date', 'message', 'status', 'created_at',
        ]
        read_only_fields = ['id', 'status', 'created_at']

    def validate(self, data):
        # Ensure the property belongs to the specified agent
        if data['property'].agent != data['agent']:
            raise serializers.ValidationError("Property does not belong to this agent.")
        return data

    def create(self, validated_data):
        return VisitRequest.objects.create(user=self.context['request'].user, **validated_data)