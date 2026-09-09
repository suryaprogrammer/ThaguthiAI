import logging
from datetime import datetime, timezone
from typing import Optional
from app.database.mongodb import MongoDB

logger = logging.getLogger(__name__)

class DatabaseService:
    """Service for handling database operations."""
    @staticmethod
    def save_profile(profile_data: dict) -> Optional[str]:
        db = MongoDB.get_db()
        if db is None:
            logger.info('MongoDB not available. Skipping profile save.')
            return None
        try:
            profile_data['created_at'] = datetime.now(timezone.utc)
            result = db.students.insert_one(profile_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f'Failed to save profile: {e}')
            return None
    
    @staticmethod
    def save_eligibility_result(result_data: dict) -> Optional[str]:
        db = MongoDB.get_db()
        if db is None:
            return None
        try:
            result_data['created_at'] = datetime.now(timezone.utc)
            result = db.eligibility_results.insert_one(result_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f'Failed to save eligibility result: {e}')
            return None
    
    @staticmethod
    def save_recommendation(recommendation_data: dict) -> Optional[str]:
        db = MongoDB.get_db()
        if db is None:
            return None
        try:
            recommendation_data['created_at'] = datetime.now(timezone.utc)
            result = db.recommendations.insert_one(recommendation_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f'Failed to save recommendation: {e}')
            return None
