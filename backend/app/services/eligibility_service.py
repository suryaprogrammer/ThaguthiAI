import logging
from app.models.student import StudentProfile
from app.models.result import EligibilityResponse, SchemeEligibilityResult
from app.rules.rule_engine import RuleEngine

logger = logging.getLogger(__name__)

class EligibilityService:
    """Service that orchestrates eligibility checking using the rule engine."""
    
    def __init__(self):
        self.rule_engine = RuleEngine()
    
    def check_eligibility(self, student: StudentProfile) -> EligibilityResponse:
        """Check student eligibility against all schemes."""
        results = self.rule_engine.evaluate_student(student)
        
        eligible = [r for r in results if r.eligible]
        not_eligible = [r for r in results if not r.eligible]
        
        return EligibilityResponse(
            eligible_schemes=eligible,
            not_eligible_schemes=not_eligible,
            total_eligible=len(eligible),
            total_not_eligible=len(not_eligible)
        )
    
    def get_all_schemes(self) -> list:
        return self.rule_engine.get_all_schemes()
    
    def get_scheme_by_id(self, scheme_id: str):
        return self.rule_engine.get_scheme_by_id(scheme_id)
