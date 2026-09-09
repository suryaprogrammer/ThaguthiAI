import logging
from fastapi import APIRouter
from app.models.result import ConflictCheckRequest, ConflictResponse
from app.services.conflict_service import ConflictService

logger = logging.getLogger(__name__)
router = APIRouter(prefix='/api/conflicts', tags=['Conflicts'])
conflict_service = ConflictService()


@router.post(
    '/check',
    response_model=ConflictResponse,
    summary='Check scheme conflicts',
    description='Check for conflicts between a set of scheme IDs. Only uses configured conflict relationships.'
)
async def check_conflicts(request: ConflictCheckRequest):
    """Check for conflicts among the provided scheme IDs."""
    return conflict_service.check_conflicts(request.scheme_ids)
