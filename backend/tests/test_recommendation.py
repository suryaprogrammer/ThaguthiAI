import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

SAMPLE_STUDENT = {
    "name": "Priya",
    "age": 19,
    "gender": "female",
    "category": "BC",
    "annual_family_income": 150000,
    "marks_percentage": 90,
    "year_of_study": 1,
    "course": "B.E",
    "course_level": "UG",
    "college_type": "government",
    "government_school_background": True,
    "disability": False,
    "disability_percentage": 0,
    "minority": False,
    "first_graduate": True,
    "district": "Madurai",
    "state": "Tamil Nadu"
}


class TestRecommendation:
    """Tests for the /api/recommendation endpoint."""
    
    def test_recommendation_response_structure(self):
        """Test that recommendation response has the expected structure."""
        response = client.post('/api/recommendation', json=SAMPLE_STUDENT)
        assert response.status_code == 200
        data = response.json()
        assert 'student' in data
        assert 'eligible_schemes' in data
        assert 'not_eligible_schemes' in data
        assert 'conflicts' in data
        assert 'recommended_schemes' in data
        assert 'total_benefit' in data
        assert 'recommendation_reason' in data
        assert 'alternative_options' in data
    
    def test_recommendation_has_schemes(self):
        """Test that a qualifying student gets recommendations."""
        response = client.post('/api/recommendation', json=SAMPLE_STUDENT)
        data = response.json()
        assert len(data['recommended_schemes']) > 0
        assert data['total_benefit'] > 0
    
    def test_recommended_schemes_are_eligible(self):
        """Test that all recommended schemes are in the eligible list."""
        response = client.post('/api/recommendation', json=SAMPLE_STUDENT)
        data = response.json()
        eligible_ids = {s['scheme_id'] for s in data['eligible_schemes']}
        for rec in data['recommended_schemes']:
            assert rec['scheme_id'] in eligible_ids, f'{rec["scheme_id"]} recommended but not eligible'
    
    def test_recommended_schemes_no_conflicts(self):
        """Test that recommended schemes do not conflict with each other."""
        response = client.post('/api/recommendation', json=SAMPLE_STUDENT)
        data = response.json()
        rec_ids = [s['scheme_id'] for s in data['recommended_schemes']]
        
        # Check that no pair in recommended is in the conflict list
        conflict_pairs = set()
        for c in data['conflicts']:
            conflict_pairs.add((c['scheme_a'], c['scheme_b']))
            conflict_pairs.add((c['scheme_b'], c['scheme_a']))
        
        for i, id_a in enumerate(rec_ids):
            for id_b in rec_ids[i+1:]:
                assert (id_a, id_b) not in conflict_pairs, f'Recommended conflicting schemes: {id_a} and {id_b}'
    
    def test_full_pipeline(self):
        """Test the full pipeline: profile -> eligibility -> conflicts -> recommendation."""
        # Step 1: Submit profile
        profile_response = client.post('/api/profile', json=SAMPLE_STUDENT)
        assert profile_response.status_code == 200
        
        # Step 2: Check eligibility
        elig_response = client.post('/api/eligibility/check', json=SAMPLE_STUDENT)
        assert elig_response.status_code == 200
        elig_data = elig_response.json()
        
        # Step 3: Check conflicts for eligible schemes
        eligible_ids = [s['scheme_id'] for s in elig_data['eligible_schemes']]
        if eligible_ids:
            conflict_response = client.post('/api/conflicts/check', json={
                'scheme_ids': eligible_ids
            })
            assert conflict_response.status_code == 200
        
        # Step 4: Get recommendation (does all above internally)
        rec_response = client.post('/api/recommendation', json=SAMPLE_STUDENT)
        assert rec_response.status_code == 200
        rec_data = rec_response.json()
        
        # Verify consistency
        assert rec_data['student']['name'] == SAMPLE_STUDENT['name']
        assert len(rec_data['eligible_schemes']) == elig_data['total_eligible']
    
    def test_explanation_fallback(self):
        """Test that /api/explain works without Gemini API key."""
        # First get eligibility result
        elig_response = client.post('/api/eligibility/check', json=SAMPLE_STUDENT)
        elig_data = elig_response.json()
        
        # Then get explanation
        explain_response = client.post('/api/explain', json={
            'student_profile': SAMPLE_STUDENT,
            'eligibility_result': elig_data,
            'recommendation_result': {}
        })
        assert explain_response.status_code == 200
        data = explain_response.json()
        assert 'explanation' in data
        assert 'important_notes' in data
        assert len(data['explanation']) > 0
    
    def test_ineligible_student_recommendation(self):
        """Test recommendation for a student who might not qualify for many schemes."""
        student = SAMPLE_STUDENT.copy()
        student['annual_family_income'] = 10000000
        student['category'] = 'OC'
        student['government_school_background'] = False
        student['first_graduate'] = False
        student['marks_percentage'] = 40
        student['gender'] = 'male'
        
        response = client.post('/api/recommendation', json=student)
        assert response.status_code == 200
        data = response.json()
        # Even if no schemes are recommended, the response should be valid
        assert 'recommended_schemes' in data
        assert 'recommendation_reason' in data
