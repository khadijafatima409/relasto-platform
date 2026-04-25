from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()


class Property(models.Model):
    PROPERTY_TYPE_CHOICES = [
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('industrial', 'Industrial'),
        ('agricultural', 'Agricultural'),
    ]
    STATUS_CHOICES = [
        ('sale', 'For Sale'),
        ('rent', 'For Rent'),
        ('sold', 'Sold'),
        ('rented', 'Rented'),
    ]

    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='sale')
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100, default='US')
    bedrooms = models.PositiveIntegerField(default=0)
    bathrooms = models.PositiveIntegerField(default=0)
    area = models.DecimalField(max_digits=10, decimal_places=2, help_text='sq ft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug = base
            n = 1
            while Property.objects.filter(slug=slug).exists():
                slug = f'{base}-{n}'
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='properties/')
    is_primary = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_primary', 'uploaded_at']


class PropertyFeature(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='features')
    key = models.CharField(max_length=100)
    value = models.CharField(max_length=255)

    class Meta:
        unique_together = ('property', 'key')

    def __str__(self):
        return f'{self.key}: {self.value}'