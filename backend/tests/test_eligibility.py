import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Sample student profiles for testing
ELIGIBLE_STUDENT = {
    "name": "Test Student",
    "age": 20,
    "gender": "female",
    "category": "BC",
    "annual_family_income": 150000,
    "marks_percentage": 82,
    "year_of_study": 2,
    "course": "B.E",
    "course_level": "UG",
    "college_type": "government",
    "government_school_background": True,
    "disability": False,
    "disability_percentage": 0,
    "minority": False,
    "first_graduate": True,
    "district": "Chennai",
    "state": "Tamil Nadu"
}

HIGH_INCOME_STUDENT = {
    "name": "High Income Student",
    "age": 21,
    "gender": "male",
    "category": "OC",
    "annual_family_income": 5000000,
    "marks_percentage": 60,
    "year_of_study": 1,
    "course": "B.A",
    "course_level": "UG",
    "college_type": "private",
    "government_school_background": False,
    "disability": False,
    "disability_percentage": 0,
    "minority": False,
    "first_graduate": False,
    "district": "Coimbatore",
    "state": "Tamil Nadu"
}


class TestEligibility:
    """Tests for the /api/eligibility/check endpoint."""
    
    def test_eligible_student(self):
        """Test that a qualifying student gets eligible schemes."""
        response = client.post('/api/eligibility/check', json=ELIGIBLE_STUDENT)
        assert response.status_code == 200
        data = response.json()
        assert 'eligible_schemes' in data
        assert 'not_eligible_schemes' in data
        assert 'total_eligible' in data
        assert 'total_not_eligible' in data
        assert isinstance(data['eligible_schemes'], list)
        assert data['total_eligible'] >= 0
        # This student (BC, female, govt school, first grad, low income) should be eligible for some schemes
        assert data['total_eligible'] > 0
    
    def test_ineligible_student(self):
        """Test that a high-income OC student gets fewer/no category schemes."""
        response = client.post('/api/eligibility/check', json=HIGH_INCOME_STUDENT)
        assert response.status_code == 200
        data = response.json()
        assert data['total_not_eligible'] > 0
    
    def test_eligibility_result_structure(self):
        """Test that each eligibility result has the expected structure."""
        response = client.post('/api/eligibility/check', json=ELIGIBLE_STUDENT)
        data = response.json()
        for scheme in data['eligible_schemes'] + data['not_eligible_schemes']:
            assert 'scheme_id' in scheme
            assert 'scheme_name' in scheme
            assert 'eligible' in scheme
            assert 'matched_conditions' in scheme
            assert 'failed_conditions' in scheme
            assert 'reasons' in scheme
    
    def test_invalid_profile_negative_income(self):
        """Test that negative income is rejected."""
        invalid = ELIGIBLE_STUDENT.copy()
        invalid['annual_family_income'] = -1000
        response = client.post('/api/eligibility/check', json=invalid)
        assert response.status_code == 422
    
    def test_invalid_profile_marks_over_100(self):
        """Test that marks over 100 are rejected."""
        invalid = ELIGIBLE_STUDENT.copy()
        invalid['marks_percentage'] = 150
        response = client.post('/api/eligibility/check', json=invalid)
        assert response.status_code == 422
    
    def test_invalid_profile_missing_fields(self):
        """Test that missing required fields are rejected."""
        response = client.post('/api/eligibility/check', json={'name': 'Incomplete'})
        assert response.status_code == 422
    
    def test_disability_student(self):
        """Test eligibility for a differently-abled student."""
        student = ELIGIBLE_STUDENT.copy()
        student['disability'] = True
        student['disability_percentage'] = 50
        response = client.post('/api/eligibility/check', json=student)
        assert response.status_code == 200
        data = response.json()
        # Should be eligible for disability scholarship
        eligible_ids = [s['scheme_id'] for s in data['eligible_schemes']]
        assert 'disability_scholarship' in eligible_ids


class TestSchemes:
    """Tests for the /api/schemes endpoints."""
    
    def test_get_all_schemes(self):
        """Test retrieving all schemes."""
        response = client.get('/api/schemes')
        assert response.status_code == 200
        data = response.json()
        assert 'schemes' in data
        assert 'total' in data
        assert len(data['schemes']) > 0
    
    def test_get_scheme_by_id(self):
        """Test retrieving a specific scheme."""
        response = client.get('/api/schemes/bc_mbc_scholarship')
        assert response.status_code == 200
        data = response.json()
        assert data['id'] == 'bc_mbc_scholarship'
        assert 'name' in data
        assert 'eligibility' in data
    
    def test_get_nonexistent_scheme(self):
        """Test that a non-existent scheme returns 404."""
        response = client.get('/api/schemes/nonexistent_scheme')
        assert response.status_code == 404


class TestProfile:
    """Tests for the /api/profile endpoint."""
    
    def test_valid_profile(self):
        """Test submitting a valid profile."""
        response = client.post('/api/profile', json=ELIGIBLE_STUDENT)
        assert response.status_code == 200
        data = response.json()
        assert data['success'] is True
        assert 'message' in data
    
    def test_invalid_profile(self):
        """Test submitting an invalid profile."""
        response = client.post('/api/profile', json={'name': 'Bad'})
        assert response.status_code == 422
