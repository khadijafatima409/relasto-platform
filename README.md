# Relasto Real Estate Platform

Relasto is a modern, full-stack real estate web application that connects buyers, renters, and agents. It provides a platform to list, search, and manage properties, as well as handle property visits and reviews.

## Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios (for API requests)

**Backend:**
- Django 5
- Django REST Framework (DRF)
- JWT Authentication (Simple JWT)
- SQLite (Database)

## Project Structure

The project is structured into a separated backend (Django) and frontend (React).

```text
relasto/
├── accounts/         # Django app for user and agent authentication
├── frontend/         # React frontend application
├── properties/       # Django app for property listings and management
├── reviews/          # Django app for property/agent reviews
├── visits/           # Django app for scheduling property visits
├── manage.py         # Django management script
├── populate.py       # Script to populate the database with sample data
└── requirements.txt  # Python dependencies
```

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Backend Setup (Django)

1. Navigate to the project root directory:
   ```bash
   cd relasto
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv env
   # On Windows:
   env\Scripts\activate
   # On macOS/Linux:
   source env/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

5. (Optional) Populate the database with sample data (creates an agent user and sample properties):
   ```bash
   python populate.py
   ```
   *Note: This creates an agent with the username `bruno` and password `password123`.*

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
   The backend will run on `http://127.0.0.1:8000/`.

### 2. Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd relasto/frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:5173/`.

## Features

- **User Authentication:** JWT-based login and registration for regular users and real estate agents.
- **Property Management:** Agents can list properties for sale or rent. Users can view detailed property listings.
- **Reviews:** Users can leave reviews and ratings.
- **Visits:** Scheduling system for property tours.

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
