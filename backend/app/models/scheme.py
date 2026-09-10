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
    min_disability_percentage: Optional[float] = None
    minority_required: Optional[bool] = None
    first_graduate_required: Optional[bool] = None
    hostel_required: Optional[bool] = None
    defence_background_required: Optional[bool] = None

class Scheme(BaseModel):
    """
    Model representing a government scheme.
    """
    id: str
    name: str
    department: str
    description: str
    benefit: str
    benefit_amount: float = 0.0
    frequency: str = "annual"
    demo: bool = False
    data_status: str = 'verified'
    scheme_type: Optional[str] = 'Scholarship'
    source_url: Optional[str] = ''
    source_title: Optional[str] = ''
    verified_on: Optional[str] = ''
    benefits: List[dict] = []
    application_method: Optional[str] = ''
    conflicts: List[str] = []
    requires_verification: Optional[bool] = None
    eligibility: SchemeEligibility
    conflicts_with: List[str] = []
    official_source: str = ''
    last_verified: str = ''
