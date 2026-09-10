import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_all_schemes_count():
    response = client.get('/api/schemes')
    assert response.status_code == 200
    data = response.json()
    assert 'schemes' in data
    assert 'total' in data
    assert data['total'] == 37
    assert len(data['schemes']) == 37

def test_get_scheme_by_id_success():
    response = client.get('/api/schemes/pudhumai_penn')
    assert response.status_code == 200
    scheme = response.json()
    assert scheme['id'] == 'pudhumai_penn'
    assert scheme['name'] == 'Pudhumai Penn Scheme'
    assert scheme['scheme_type'] == 'Monthly Assistance'

def test_get_scheme_by_id_not_found():
    response = client.get('/api/schemes/non_existent_scheme_id_123')
    assert response.status_code == 404

def test_get_schemes_status_verified_filter():
    response = client.get('/api/schemes?status=verified')
    assert response.status_code == 200
    data = response.json()
    for scheme in data['schemes']:
        status = scheme.get('data_status', '')
        req_verif = scheme.get('requires_verification') is True
        assert not status.startswith('requires_verification')
        assert not req_verif

def test_get_schemes_status_requires_verification_filter():
    response = client.get('/api/schemes?status=requires_verification')
    assert response.status_code == 200
    data = response.json()
    assert data['total'] >= 5
    for scheme in data['schemes']:
        status = scheme.get('data_status', '')
        req_verif = scheme.get('requires_verification') is True
        assert status.startswith('requires_verification') or req_verif

def test_get_schemes_search_filter():
    response = client.get('/api/schemes?search=Pudhumai')
    assert response.status_code == 200
    data = response.json()
    assert data['total'] >= 1
    assert any(s['id'] == 'pudhumai_penn' for s in data['schemes'])

def test_get_schemes_department_filter():
    response = client.get('/api/schemes?department=Adi%20Dravidar')
    assert response.status_code == 200
    data = response.json()
    assert data['total'] >= 3
    for s in data['schemes']:
        assert 'Adi Dravidar' in s['department']
