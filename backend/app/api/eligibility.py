import logging
from fastapi import APIRouter
from app.models.student import StudentProfile
from app.models.result import EligibilityResponse
from app.services.eligibility_service import EligibilityService
from app.services.database_service import DatabaseService

logger = logging.getLogger(__name__)
router = APIRouter(prefix='/api/eligibility', tags=['Eligibility'])
eligibility_service = EligibilityService()


@router.post(
    '/check',
    response_model=EligibilityResponse,
    summary='Check eligibility',
    description='Check a student\'s eligibility against all available schemes using the deterministic rule engine.'
)
async def check_eligibility(student: StudentProfile):
    """Check student eligibility against all schemes.
    
    The eligibility is determined by the deterministic Python rule engine.
    Gemini AI is NOT involved in eligibility decisions.
    """
    result = eligibility_service.check_eligibility(student)
    
    # Save result to database if available
    DatabaseService.save_eligibility_result({
        'student': student.model_dump(),
        'result': result.model_dump()
    })
    
    return result
