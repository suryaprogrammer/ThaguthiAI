import logging
from fastapi import APIRouter
from app.models.student import StudentProfile, ProfileResponse
from app.services.database_service import DatabaseService

logger = logging.getLogger(__name__)
router = APIRouter(prefix='/api/profile', tags=['Profile'])


@router.post(
    '',
    response_model=ProfileResponse,
    summary='Submit student profile',
    description='Validate and optionally save a student profile. Works without MongoDB.'
)
async def submit_profile(profile: StudentProfile):
    """Validate a student profile and save to database if available."""
    profile_data = profile.model_dump()
    profile_id = DatabaseService.save_profile(profile_data)
    
    if profile_id:
        return ProfileResponse(
            success=True,
            message='Profile validated and saved successfully.',
            profile_id=profile_id
        )
    
    return ProfileResponse(
        success=True,
        message='Profile validated successfully. Database not available for persistence.',
        profile_id=None
    )
