import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Base template for student profiles
BASE_STUDENT = {
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
        response = client.post('/api/eligibility/check', json=BASE_STUDENT)
        assert response.status_code == 200
        data = response.json()
        assert 'eligible_schemes' in data
        assert 'not_eligible_schemes' in data
        assert 'total_eligible' in data
        assert 'total_not_eligible' in data
        assert isinstance(data['eligible_schemes'], list)
        assert data['total_eligible'] > 0
    
    def test_ineligible_student(self):
        """Test that a high-income OC student gets fewer/no category schemes."""
        response = client.post('/api/eligibility/check', json=HIGH_INCOME_STUDENT)
        assert response.status_code == 200
        data = response.json()
        assert data['total_not_eligible'] > 0
    
    def test_eligibility_result_structure(self):
        """Test that each eligibility result has the expected structure."""
        response = client.post('/api/eligibility/check', json=BASE_STUDENT)
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
        invalid = BASE_STUDENT.copy()
        invalid['annual_family_income'] = -1000
        response = client.post('/api/eligibility/check', json=invalid)
        assert response.status_code == 422
    
    def test_invalid_profile_marks_over_100(self):
        """Test that marks over 100 are rejected."""
        invalid = BASE_STUDENT.copy()
        invalid['marks_percentage'] = 150
        response = client.post('/api/eligibility/check', json=invalid)
        assert response.status_code == 422
    
    def test_invalid_profile_missing_fields(self):
        """Test that missing required fields are rejected."""
        response = client.post('/api/eligibility/check', json={'name': 'Incomplete'})
        assert response.status_code == 422
    
    def test_disability_student(self):
        """Test eligibility for a differently-abled student."""
        student = BASE_STUDENT.copy()
        student['disability'] = True
        student['disability_percentage'] = 50
        response = client.post('/api/eligibility/check', json=student)
        assert response.status_code == 200
        data = response.json()
        eligible_ids = [s['scheme_id'] for s in data['eligible_schemes']]
        assert 'disability_scholarship' in eligible_ids

    # --- CATEGORY SPECIFIC VERIFICATION TESTS (MANDATORY) ---

    def test_1_bc_student_sc_scholarship_ineligible(self):
        """TEST 1: BC student -> SC scholarship = NOT ELIGIBLE"""
        student = BASE_STUDENT.copy()
        student['category'] = 'BC'
        response = client.post('/api/eligibility/check', json=student)
        assert response.status_code == 200
        data = response.json()
        
        sc_res = next((s for s in data['not_eligible_schemes'] if s['scheme_id'] == 'sc_scholarship'), None)
        assert sc_res is not None, "SC scholarship should be in not_eligible_schemes for BC student"
        assert sc_res['eligible'] is False
        assert any("Category requirement not satisfied" in r for r in sc_res['reasons'] + sc_res['failed_conditions'])

    def test_2_mbc_student_sc_scholarship_ineligible(self):
        """TEST 2: MBC student -> SC scholarship = NOT ELIGIBLE"""
        student = BASE_STUDENT.copy()
        student['category'] = 'MBC'
        response = client.post('/api/eligibility/check', json=student)
        assert response.status_code == 200
        data = response.json()
        
        sc_res = next((s for s in data['not_eligible_schemes'] if s['scheme_id'] == 'sc_scholarship'), None)
        assert sc_res is not None, "SC scholarship should be in not_eligible_schemes for MBC student"
        assert sc_res['eligible'] is False

    def test_3_dnc_student_sc_scholarship_ineligible(self):
        """TEST 3: DNC student -> SC scholarship = NOT ELIGIBLE"""
        student = BASE_STUDENT.copy()
        student['category'] = 'DNC'
        response = client.post('/api/eligibility/check', json=student)
        assert response.status_code == 200
        data = response.json()
        
        sc_res = next((s for s in data['not_eligible_schemes'] if s['scheme_id'] == 'sc_scholarship'), None)
        assert sc_res is not None, "SC scholarship should be in not_eligible_schemes for DNC student"
        assert sc_res['eligible'] is False

    def test_4_sc_student_sc_scholarship_eligible(self):
        """TEST 4: SC student -> SC scholarship = ELIGIBLE if all other conditions pass"""
        student = BASE_STUDENT.copy()
        student['category'] = 'SC'
        response = client.post('/api/eligibility/check', json=student)
        assert response.status_code == 200
        data = response.json()
        
        sc_res = next((s for s in data['eligible_schemes'] if s['scheme_id'] == 'sc_scholarship'), None)
        assert sc_res is not None, "SC scholarship should be in eligible_schemes for qualifying SC student"
        assert sc_res['eligible'] is True

    def test_5_bc_student_bc_scholarship_eligible(self):
        """TEST 5: BC student -> BC scholarship = ELIGIBLE if all other conditions pass"""
        student = BASE_STUDENT.copy()
        student['category'] = 'BC'
        response = client.post('/api/eligibility/check', json=student)
        assert response.status_code == 200
        data = response.json()
        
        bc_res = next((s for s in data['eligible_schemes'] if s['scheme_id'] == 'bc_mbc_scholarship'), None)
        assert bc_res is not None, "BC scholarship should be in eligible_schemes for qualifying BC student"
        assert bc_res['eligible'] is True

    def test_6_mbc_student_mbc_dnc_scholarship_eligible(self):
        """TEST 6: MBC student -> MBC/DNC scholarship = ELIGIBLE if all other conditions pass"""
        student = BASE_STUDENT.copy()
        student['category'] = 'MBC'
        response = client.post('/api/eligibility/check', json=student)
        assert response.status_code == 200
        data = response.json()
        
        mbc_res = next((s for s in data['eligible_schemes'] if s['scheme_id'] == 'bc_mbc_scholarship'), None)
        assert mbc_res is not None, "BC/MBC scholarship should be in eligible_schemes for qualifying MBC student"
        assert mbc_res['eligible'] is True

    def test_7_st_student_sc_scholarship_ineligible(self):
        """TEST 7: ST student -> SC scholarship = NOT ELIGIBLE"""
        student = BASE_STUDENT.copy()
        student['category'] = 'ST'
        response = client.post('/api/eligibility/check', json=student)
        assert response.status_code == 200
        data = response.json()
        
        sc_res = next((s for s in data['not_eligible_schemes'] if s['scheme_id'] == 'sc_scholarship'), None)
        assert sc_res is not None, "SC scholarship should be in not_eligible_schemes for ST student"
        assert sc_res['eligible'] is False

    def test_8_failed_category_never_in_recommendations(self):
        """TEST 8: Student who does not satisfy category requirement must never appear in recommendations."""
        student = BASE_STUDENT.copy()
        student['category'] = 'BC'
        response = client.post('/api/recommendation', json=student)
        assert response.status_code == 200
        data = response.json()
        
        recommended_ids = [s['scheme_id'] for s in data['recommended_schemes']]
        assert 'sc_scholarship' not in recommended_ids, "SC scholarship must NEVER be recommended to BC student"
        assert 'st_scholarship' not in recommended_ids, "ST scholarship must NEVER be recommended to BC student"


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
        response = client.post('/api/profile', json=BASE_STUDENT)
        assert response.status_code == 200
        data = response.json()
        assert data['success'] is True
        assert 'message' in data
    
    def test_invalid_profile(self):
        """Test submitting an invalid profile."""
        response = client.post('/api/profile', json={'name': 'Bad'})
        assert response.status_code == 422
