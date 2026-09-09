import logging
from fastapi import APIRouter
from app.models.student import StudentProfile
from app.models.result import RecommendationResponse
from app.services.recommendation_service import RecommendationService
from app.services.database_service import DatabaseService

logger = logging.getLogger(__name__)
router = APIRouter(prefix='/api/recommendation', tags=['Recommendation'])
recommendation_service = RecommendationService()


@router.post(
    '',
    response_model=RecommendationResponse,
    summary='Get scheme recommendations',
    description='Full pipeline: eligibility check → conflict detection → ranking → best recommendation. This is the main endpoint for the frontend.'
)
async def get_recommendation(student: StudentProfile):
    """Get recommended schemes for a student.
    
    Pipeline:
    1. Check eligibility against all schemes
    2. Detect conflicts among eligible schemes
    3. Rank valid schemes
    4. Return best non-conflicting combination
    """
    result = recommendation_service.get_recommendation(student)
    
    # Save recommendation to database if available
    DatabaseService.save_recommendation(result.model_dump())
    
    return result
