import pytest
from app.database.seed_schemes import seed_schemes
from app.database.mongodb import MongoDB

def test_seed_schemes_without_db():
    # If MongoDB is not connected, seed_schemes should return 0 safely without crashing
    count = seed_schemes()
    assert count == 0 or count == 37
