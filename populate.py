import os
import django
import sys
from decimal import Decimal

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "relasto.settings")
django.setup()

from django.contrib.auth import get_user_model
from properties.models import Property, PropertyImage

User = get_user_model()

def populate():
    # 1. Create a superuser/agent
    if not User.objects.filter(username="bruno").exists():
        user = User.objects.create_superuser("bruno", "bruno@relasto.com", "password123")
        user.is_agent = True
        user.save()
        print("Created agent 'bruno'")
    else:
        user = User.objects.get(username="bruno")
        print("Agent 'bruno' already exists")

    # 2. Add properties
    if not Property.objects.exists():
        properties_data = [
            {
                "title": "Stunning Villa in Beverly Hills",
                "description": "A beautiful villa with a private pool and amazing views.",
                "price": Decimal("2500000.00"),
                "property_type": "residential",
                "status": "sale",
                "address": "123 Beverly Way",
                "city": "Beverly Hills",
                "state": "CA",
                "country": "US",
                "bedrooms": 5,
                "bathrooms": 6,
                "area": Decimal("4500.00"),
            },
            {
                "title": "Modern Apartment Downtown",
                "description": "Sleek and modern apartment located in the heart of the city.",
                "price": Decimal("3500.00"),
                "property_type": "residential",
                "status": "rent",
                "address": "456 Main St, Apt 4B",
                "city": "New York",
                "state": "NY",
                "country": "US",
                "bedrooms": 2,
                "bathrooms": 2,
                "area": Decimal("1200.00"),
            },
            {
                "title": "Spacious Commercial Office",
                "description": "Large office space suitable for a growing startup.",
                "price": Decimal("850000.00"),
                "property_type": "commercial",
                "status": "sale",
                "address": "789 Tech Blvd",
                "city": "San Francisco",
                "state": "CA",
                "country": "US",
                "bedrooms": 0,
                "bathrooms": 4,
                "area": Decimal("6000.00"),
            }
        ]

        for p_data in properties_data:
            prop = Property.objects.create(agent=user, **p_data)
            print(f"Created property: {prop.title}")
    else:
        print("Properties already exist in the database.")

if __name__ == "__main__":
    populate()
