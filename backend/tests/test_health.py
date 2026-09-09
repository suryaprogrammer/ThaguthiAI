import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


class TestHealthEndpoint:
    """Tests for the /health endpoint."""
    
    def test_health_check(self):
        """Test that the health endpoint returns ok status."""
        response = client.get('/health')
        assert response.status_code == 200
        data = response.json()
        assert data['status'] == 'ok'
        assert data['service'] == 'ThaguthiAI Backend'
    
    def test_health_has_mongodb_status(self):
        """Test that health endpoint reports MongoDB status."""
        response = client.get('/health')
        data = response.json()
        assert 'mongodb' in data
