# ThaguthiAI Backend

> "Know what you're eligible for."

## Overview
ThaguthiAI is an AI-powered Tamil Nadu student scholarship and government-scheme eligibility assistant. This backend provides APIs for checking scheme eligibility, detecting conflicts, recommending optimal scheme combinations, and explaining results using Google Gemini AI.

## Architecture
```
Student Profile
      ↓
FastAPI API
      ↓
Deterministic Python Rule Engine (Source of Truth)
      ↓
Eligible / Not Eligible Schemes
      ↓
Conflict Detection
      ↓
Recommendation Engine
      ↓
Gemini AI Explanation (Optional)
      ↓
Frontend-ready JSON Response
```

IMPORTANT: Gemini AI is NEVER the source of truth for eligibility. The deterministic Python rule engine decides eligibility. Gemini only explains the results.

## Technology Stack
- Python 3.11+
- FastAPI
- Pydantic v2
- Uvicorn
- MongoDB Atlas (optional)
- PyMongo
- Google Gemini API (optional)
- python-dotenv

## Project Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── api/           # API route handlers
│   ├── models/        # Pydantic models
│   ├── services/      # Business logic
│   ├── rules/         # Eligibility rule engine
│   └── database/      # MongoDB connection
├── data/
│   └── schemes.json   # Demo scheme dataset
├── tests/             # Automated tests
├── requirements.txt
├── .env.example
└── .gitignore
```

## Setup

### 1. Create Virtual Environment
```bash
cd backend
python -m venv venv
```

### 2. Activate Virtual Environment
Windows:
```bash
venv\Scripts\activate
```
Linux/Mac:
```bash
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
```bash
copy .env.example .env
```
Edit .env and add your keys (all optional for basic testing):
- GEMINI_API_KEY - For AI explanations
- MONGODB_URI - For data persistence
- DATABASE_NAME - Database name (default: thaguthiai)

### 5. Run the Server
```bash
uvicorn app.main:app --reload
```

Server starts at: http://127.0.0.1:8000
Swagger docs: http://127.0.0.1:8000/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| GET | /api/schemes | List all schemes |
| GET | /api/schemes/{id} | Get scheme by ID |
| POST | /api/profile | Validate & save profile |
| POST | /api/eligibility/check | Check eligibility |
| POST | /api/conflicts/check | Check scheme conflicts |
| POST | /api/recommendation | Full pipeline recommendation |
| POST | /api/explain | AI explanation of results |

## Sample Requests

### Check Eligibility
```bash
curl -X POST http://127.0.0.1:8000/api/eligibility/check \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Demo Student",
    "age": 20,
    "gender": "female",
    "category": "BC",
    "annual_family_income": 150000,
    "marks_percentage": 82,
    "year_of_study": 2,
    "course": "B.E",
    "course_level": "UG",
    "college_type": "government",
    "government_school_background": true,
    "disability": false,
    "disability_percentage": 0,
    "minority": false,
    "first_graduate": true,
    "district": "Chennai",
    "state": "Tamil Nadu"
  }'
```

### Get Recommendation
```bash
curl -X POST http://127.0.0.1:8000/api/recommendation \
  -H "Content-Type: application/json" \
  -d '{...same profile as above...}'
```

### Check Conflicts
```bash
curl -X POST http://127.0.0.1:8000/api/conflicts/check \
  -H "Content-Type: application/json" \
  -d '{"scheme_ids": ["sc_st_scholarship", "bc_mbc_scholarship"]}'
```

## Testing

```bash
pytest tests/ -v
```

## Important Notes

⚠️ All scheme data in this project is DEMO/SAMPLE data created for hackathon purposes.
Do NOT rely on this data for actual government scheme applications.
Always verify against current official government notifications.

## Frontend Integration

This backend is designed for a future React + TypeScript frontend. CORS is pre-configured for:
- http://localhost:3000
- http://localhost:5173
- http://localhost:8080

The main endpoint for the frontend is POST /api/recommendation which returns a complete response with eligibility, conflicts, and recommendations.

## License

Hackathon Project - ThaguthiAI
