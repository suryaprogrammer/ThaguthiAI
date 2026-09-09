from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class SchemeEligibilityResult(BaseModel):
    """Result of checking a student's eligibility for a specific scheme."""
    scheme_id: str
    scheme_name: str
    eligible: bool
    matched_conditions: List[str] = []
    failed_conditions: List[str] = []
    reasons: List[str] = []

class EligibilityResponse(BaseModel):
    """Response containing eligibility results across multiple schemes."""
    eligible_schemes: List[SchemeEligibilityResult] = []
    not_eligible_schemes: List[SchemeEligibilityResult] = []
    total_eligible: int = 0
    total_not_eligible: int = 0

class ConflictPair(BaseModel):
    """Represents a conflict between two schemes."""
    scheme_a: str
    scheme_b: str
    reason: str

class ConflictResponse(BaseModel):
    """Response detailing conflicts among a set of schemes."""
    conflicts_found: bool = False
    conflicts: List[ConflictPair] = []
    valid_scheme_ids: List[str] = []

class ConflictCheckRequest(BaseModel):
    """Request payload to check conflicts among schemes."""
    scheme_ids: List[str]

class RecommendedScheme(BaseModel):
    """A recommended scheme with a calculated score."""
    scheme_id: str
    scheme_name: str
    benefit_amount: float
    benefit: str
    score: float
    reasons: List[str] = []

class RecommendationResponse(BaseModel):
    """Comprehensive recommendation result for a student."""
    student: dict = {}
    eligible_schemes: List[SchemeEligibilityResult] = []
    not_eligible_schemes: List[SchemeEligibilityResult] = []
    conflicts: List[ConflictPair] = []
    recommended_schemes: List[RecommendedScheme] = []
    total_benefit: float = 0
    recommendation_reason: str = ''
    alternative_options: List[List[RecommendedScheme]] = []

class ExplanationRequest(BaseModel):
    """Request payload for generating an explanation of recommendations."""
    student_profile: dict
    eligibility_result: dict
    recommendation_result: dict = {}

class ExplanationResponse(BaseModel):
    """Response payload containing generated explanation."""
    explanation: str
    important_notes: List[str] = []
