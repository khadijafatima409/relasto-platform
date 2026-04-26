from django.db import models
from django.contrib.auth import get_user_model
from properties.models import Property

User = get_user_model()


class VisitRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='visit_requests')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='visit_requests')
    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='agent_visits')
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    preferred_date = models.DateField()
    message = models.TextField(blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']