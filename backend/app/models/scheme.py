from pydantic import BaseModel
from typing import List, Optional

class SchemeEligibility(BaseModel):
    """
    Model specifying the eligibility criteria for a government scheme.
    """
    gender: List[str] = []
    categories: List[str] = []
    max_income: Optional[float] = None
    min_marks: Optional[float] = None
    school_background: List[str] = []
    education_levels: List[str] = []
    course_types: List[str] = []
    college_types: List[str] = []
    disability_required: Optional[bool] = None
    minority_required: Optional[bool] = None
    first_graduate_required: Optional[bool] = None

class Scheme(BaseModel):
    """
    Model representing a government scheme.
    """
    id: str
    name: str
    department: str
    description: str
    benefit: str
    benefit_amount: float
    frequency: str
    demo: bool = True
    data_status: str = 'sample/demo - verify against current government notification'
    eligibility: SchemeEligibility
    conflicts_with: List[str] = []
    official_source: str = ''
    last_verified: str = ''
