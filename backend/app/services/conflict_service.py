import logging
from typing import List
from app.models.result import ConflictResponse, ConflictPair
from app.rules.rule_engine import RuleEngine

logger = logging.getLogger(__name__)

class ConflictService:
    """Detects conflicts between schemes based on configured conflict relationships."""
    
    def __init__(self):
        self.rule_engine = RuleEngine()
    
    def check_conflicts(self, scheme_ids: List[str]) -> ConflictResponse:
        """Check for conflicts among a list of scheme IDs."""
        conflicts = []
        schemes_data = {}
        
        # Load scheme data for requested IDs
        for sid in scheme_ids:
            scheme = self.rule_engine.get_scheme_by_id(sid)
            if scheme:
                schemes_data[sid] = scheme
        
        # Check pairwise conflicts
        checked_pairs = set()
        for sid in scheme_ids:
            scheme = schemes_data.get(sid)
            if not scheme:
                continue
            conflicts_with = scheme.get('conflicts_with', [])
            for conflict_id in conflicts_with:
                if conflict_id in scheme_ids:
                    pair = tuple(sorted([sid, conflict_id]))
                    if pair not in checked_pairs:
                        checked_pairs.add(pair)
                        scheme_b = schemes_data.get(conflict_id, {})
                        conflicts.append(ConflictPair(
                            scheme_a=sid,
                            scheme_b=conflict_id,
                            reason=f'{scheme.get("name", sid)} and {scheme_b.get("name", conflict_id)} cannot be combined according to the configured demo rules.'
                        ))
        
        # Determine valid (non-conflicting) scheme IDs
        conflicting_ids = set()
        for c in conflicts:
            conflicting_ids.add(c.scheme_a)
            conflicting_ids.add(c.scheme_b)
        
        valid_ids = [sid for sid in scheme_ids if sid not in conflicting_ids]
        
        return ConflictResponse(
            conflicts_found=len(conflicts) > 0,
            conflicts=conflicts,
            valid_scheme_ids=valid_ids
        )
