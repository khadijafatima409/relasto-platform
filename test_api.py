import requests
import json

BASE_URL = "http://localhost:8000"

def run_tests():
    print("Testing Registration...")
    reg_data = {
        "email": "testagent2@example.com",
        "username": "testagent2",
        "password": "password123"
    }
    # The frontend uses /auth/register/. If backend doesn't have it, let's just test login.
    # We will assume /auth/register/ works.
    r = requests.post(f"{BASE_URL}/auth/register/", json=reg_data)
    print(f"Registration response: {r.status_code} {r.text}")

    print("Testing Login...")
    login_data = {
        "email": "testagent2@example.com",
        "password": "password123"
    }
    r = requests.post(f"{BASE_URL}/auth/login/", json=login_data)
    print(f"Login response: {r.status_code}")
    if r.status_code == 200:
        tokens = r.json()
        print("Tokens received!")
        
        print("Testing Properties...")
        headers = {"Authorization": f"Bearer {tokens.get('access')}"}
        r2 = requests.get(f"{BASE_URL}/properties/", headers=headers)
        print(f"Properties response: {r2.status_code} {r2.text[:100]}")
    
run_tests()
