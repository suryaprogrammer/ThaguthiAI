from typing import Optional
from fastapi import APIRouter, HTTPException
from app.services.eligibility_service import EligibilityService

router = APIRouter(prefix='/api/schemes', tags=['Schemes'])
eligibility_service = EligibilityService()


@router.get(
    '',
    summary='Get all schemes',
    description='Returns all available Tamil Nadu student scholarship and government schemes.'
)
async def get_all_schemes(
    category: Optional[str] = None,
    department: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None
):
    """Retrieve schemes from the dataset with optional filtering."""
    schemes = eligibility_service.get_all_schemes()
    filtered = []
    for s in schemes:
        # Category / scheme_type filter
        if category:
            cat_match = (
                category.lower() in s.get('scheme_type', '').lower()
                or category.lower() in s.get('department', '').lower()
            )
            if not cat_match:
                continue

        # Department filter
        if department:
            if department.lower() not in s.get('department', '').lower():
                continue

        # Status filter (verified / requires_verification)
        if status:
            d_status = s.get('data_status', '')
            req_verif = s.get('requires_verification') is True
            if status.lower() == 'verified':
                if d_status.startswith('requires_verification') or req_verif:
                    continue
            elif status.lower() == 'requires_verification':
                if not (d_status.startswith('requires_verification') or req_verif):
                    continue

        # Case-insensitive search
        if search:
            q = search.lower()
            name_match = q in s.get('name', '').lower()
            desc_match = q in s.get('description', '').lower()
            dept_match = q in s.get('department', '').lower()
            if not (name_match or desc_match or dept_match):
                continue

        filtered.append(s)

    return {
        'schemes': filtered,
        'total': len(filtered)
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
