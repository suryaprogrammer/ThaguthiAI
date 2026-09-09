from fastapi import APIRouter, HTTPException
from app.services.eligibility_service import EligibilityService

router = APIRouter(prefix='/api/schemes', tags=['Schemes'])
eligibility_service = EligibilityService()


@router.get(
    '',
    summary='Get all schemes',
    description='Returns all available Tamil Nadu student scholarship and government schemes.'
)
async def get_all_schemes():
    """Retrieve all schemes from the dataset."""
    schemes = eligibility_service.get_all_schemes()
    return {
        'schemes': schemes,
        'total': len(schemes)
    }


@router.get(
    '/{scheme_id}',
    summary='Get scheme by ID',
    description='Returns a specific scheme by its ID. Returns 404 if not found.'
)
async def get_scheme_by_id(scheme_id: str):
    """Retrieve a specific scheme by ID."""
    scheme = eligibility_service.get_scheme_by_id(scheme_id)
    if not scheme:
        raise HTTPException(status_code=404, detail=f'Scheme with id "{scheme_id}" not found.')
    return scheme
