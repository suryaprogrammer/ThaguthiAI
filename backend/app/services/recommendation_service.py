import logging
from itertools import combinations
from typing import List
from app.models.student import StudentProfile
from app.models.result import (
    RecommendationResponse, RecommendedScheme,
    SchemeEligibilityResult, ConflictPair
)
from app.services.eligibility_service import EligibilityService
from app.services.conflict_service import ConflictService

logger = logging.getLogger(__name__)

class RecommendationService:
    """Recommendation engine: eligibility -> conflicts -> ranking -> best combination."""
    
    def __init__(self):
        self.eligibility_service = EligibilityService()
        self.conflict_service = ConflictService()
    
    def get_recommendation(self, student: StudentProfile) -> RecommendationResponse:
        """Full pipeline: eligibility -> conflict -> rank -> recommend."""
        # Step 1: Check eligibility
        elig_result = self.eligibility_service.check_eligibility(student)
        
        if not elig_result.eligible_schemes:
            return RecommendationResponse(
                student=student.model_dump(),
                eligible_schemes=elig_result.eligible_schemes,
                not_eligible_schemes=elig_result.not_eligible_schemes,
                conflicts=[],
                recommended_schemes=[],
                total_benefit=0,
                recommendation_reason='No eligible schemes found for the given profile.',
                alternative_options=[]
            )
        
        # Step 2: Check conflicts among eligible schemes
        eligible_ids = [s.scheme_id for s in elig_result.eligible_schemes]
        conflict_result = self.conflict_service.check_conflicts(eligible_ids)
        
        # Step 3: Score and rank eligible schemes (strictly eligible ones only)
        scored_schemes = self._score_schemes(elig_result.eligible_schemes, student)
        
        # Step 4: Find best non-conflicting combination
        best_combo, alternatives = self._find_best_combination(
            scored_schemes, conflict_result.conflicts
        )
        
        total_benefit = sum(s.benefit_amount for s in best_combo)
        
        reason = self._generate_reason(best_combo, student)
        
        return RecommendationResponse(
            student=student.model_dump(),
            eligible_schemes=elig_result.eligible_schemes,
            not_eligible_schemes=elig_result.not_eligible_schemes,
            conflicts=conflict_result.conflicts,
            recommended_schemes=best_combo,
            total_benefit=total_benefit,
            recommendation_reason=reason,
            alternative_options=alternatives
        )
    
    def _score_schemes(self, eligible_schemes: List[SchemeEligibilityResult], student: StudentProfile) -> List[RecommendedScheme]:
        """Score and rank eligible schemes."""
        scored = []
        for scheme_result in eligible_schemes:
            # STRICT GUARANTEE: Never score or recommend ineligible schemes
            if not scheme_result.eligible:
                continue
                
            scheme_data = self.eligibility_service.get_scheme_by_id(scheme_result.scheme_id)
            if not scheme_data:
                continue
            
            # Scoring factors
            benefit_amount = scheme_data.get('benefit_amount', 0)
            
            # Score based on: benefit amount (normalized), matched conditions ratio
            matched_count = len(scheme_result.matched_conditions)
            score = benefit_amount / 1000  # Normalize benefit
            score += matched_count * 2  # Bonus for more matched conditions
            
            scored.append(RecommendedScheme(
                scheme_id=scheme_result.scheme_id,
                scheme_name=scheme_result.scheme_name,
                benefit_amount=benefit_amount,
                benefit=scheme_data.get('benefit', ''),
                score=round(score, 2),
                reasons=scheme_result.matched_conditions
            ))
        
        # Sort by score descending
        scored.sort(key=lambda s: s.score, reverse=True)
        return scored
    
    def _find_best_combination(
        self,
        scored_schemes: List[RecommendedScheme],
        conflicts: List[ConflictPair]
    ) -> tuple:
        """Find the best non-conflicting combination of schemes."""
        if not scored_schemes:
            return [], []
        
        # Build conflict pairs set
        conflict_pairs = set()
        for c in conflicts:
            conflict_pairs.add((c.scheme_a, c.scheme_b))
            conflict_pairs.add((c.scheme_b, c.scheme_a))
        
        def is_valid_combination(combo):
            ids = [s.scheme_id for s in combo]
            for i, id_a in enumerate(ids):
                for id_b in ids[i+1:]:
                    if (id_a, id_b) in conflict_pairs:
                        return False
            return True
        
        # Try all combinations from largest to smallest
        all_valid_combos = []
        for size in range(len(scored_schemes), 0, -1):
            for combo in combinations(scored_schemes, size):
                if is_valid_combination(combo):
                    total = sum(s.benefit_amount for s in combo)
                    all_valid_combos.append((list(combo), total))
        
        if not all_valid_combos:
            # If no valid combination (shouldn't happen with single schemes), return top scheme
            return [scored_schemes[0]], []
        
        # Sort by total benefit descending
        all_valid_combos.sort(key=lambda x: x[1], reverse=True)
        
        best = all_valid_combos[0][0]
        alternatives = [combo for combo, _ in all_valid_combos[1:4]]  # Top 3 alternatives
        
        return best, alternatives
    
    def _generate_reason(self, recommended: List[RecommendedScheme], student: StudentProfile) -> str:
        """Generate a human-readable recommendation reason."""
        if not recommended:
            return 'No eligible schemes found for the given profile.'
        
        scheme_names = [s.scheme_name for s in recommended]
        total = sum(s.benefit_amount for s in recommended)
        
        if len(recommended) == 1:
            return f'Recommended {scheme_names[0]} based on profile match. Estimated annual benefit: ₹{total:,.0f}.'
        
        return (
            f'Recommended {len(recommended)} schemes: {", ".join(scheme_names)}. '
            f'These schemes are compatible and can be availed together. '
            f'Estimated total annual benefit: ₹{total:,.0f}.'
        )
