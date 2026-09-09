import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


class TestConflicts:
    """Tests for the /api/conflicts/check endpoint."""
    
    def test_conflicting_schemes(self):
        """Test that known conflicting schemes are detected."""
        # sc_scholarship conflicts with bc_mbc_ug_degree_free_education
        response = client.post('/api/conflicts/check', json={
            'scheme_ids': ['sc_scholarship', 'bc_mbc_ug_degree_free_education']
        })
        assert response.status_code == 200
        data = response.json()
        assert data['conflicts_found'] is True
        assert len(data['conflicts']) > 0
    
    def test_non_conflicting_schemes(self):
        """Test that non-conflicting schemes pass."""
        response = client.post('/api/conflicts/check', json={
            'scheme_ids': ['merit_scholarship', 'first_graduate_assistance']
        })
        assert response.status_code == 200
        data = response.json()
        assert data['conflicts_found'] is False
    
    def test_single_scheme_no_conflict(self):
        """Test that a single scheme has no conflicts."""
        response = client.post('/api/conflicts/check', json={
            'scheme_ids': ['merit_scholarship']
        })
        assert response.status_code == 200
        data = response.json()
        assert data['conflicts_found'] is False
    
    def test_empty_scheme_list(self):
        """Test with empty scheme list."""
        response = client.post('/api/conflicts/check', json={
            'scheme_ids': []
        })
        assert response.status_code == 200
        data = response.json()
        assert data['conflicts_found'] is False
    
    def test_conflict_response_structure(self):
        """Test conflict response has correct structure."""
        response = client.post('/api/conflicts/check', json={
            'scheme_ids': ['sc_scholarship', 'bc_mbc_ug_degree_free_education']
        })
        data = response.json()
        assert 'conflicts_found' in data
        assert 'conflicts' in data
        assert 'valid_scheme_ids' in data
        for conflict in data['conflicts']:
            assert 'scheme_a' in conflict
            assert 'scheme_b' in conflict
            assert 'reason' in conflict
    
    def test_gender_conflict(self):
        """Test that pudhumai_penn and tamil_pudhalvan conflict."""
        response = client.post('/api/conflicts/check', json={
            'scheme_ids': ['pudhumai_penn', 'tamil_pudhalvan']
        })
        assert response.status_code == 200
        data = response.json()
        assert data['conflicts_found'] is True
