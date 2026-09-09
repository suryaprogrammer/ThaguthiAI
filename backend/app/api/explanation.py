import logging
from fastapi import APIRouter
from app.models.result import ExplanationRequest, ExplanationResponse
from app.services.gemini_service import GeminiService

logger = logging.getLogger(__name__)
router = APIRouter(prefix='/api/explain', tags=['Explanation'])
gemini_service = GeminiService()


@router.post(
    '',
    response_model=ExplanationResponse,
    summary='Explain eligibility results',
    description='Uses Gemini AI to explain eligibility and recommendation results in simple language. Falls back to rule-based explanation if Gemini is unavailable.'
)
async def explain_results(request: ExplanationRequest):
    """Explain eligibility and recommendation results.
    
    Gemini AI is used ONLY for explanation.
    It does NOT decide eligibility or override the rule engine.
    """
    return gemini_service.explain_results(
        student_profile=request.student_profile,
        eligibility_result=request.eligibility_result,
        recommendation_result=request.recommendation_result
    )
