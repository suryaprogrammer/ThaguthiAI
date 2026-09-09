import json
import os
import logging
from pathlib import Path
from typing import List
from app.models.student import StudentProfile
from app.models.result import SchemeEligibilityResult

logger = logging.getLogger(__name__)

class RuleEngine:
    """Deterministic rule engine for scheme eligibility evaluation.
    This is the single source of truth - Gemini MUST NOT override these decisions."""
    
    def __init__(self):
        self.schemes = self._load_schemes()
    
    def _load_schemes(self) -> list:
        """Load schemes from data/schemes.json"""
        # Try multiple paths to find schemes.json
        possible_paths = [
            Path(__file__).parent.parent.parent.parent / 'data' / 'schemes.json',
            Path('data/schemes.json'),
            Path(__file__).resolve().parent.parent.parent / 'data' / 'schemes.json',
        ]
        for path in possible_paths:
            if path.exists():
                with open(path, 'r', encoding='utf-8') as f:
                    return json.load(f)
        logger.error('schemes.json not found')
        return []
    
    def evaluate_student(self, student: StudentProfile) -> List[SchemeEligibilityResult]:
        """Evaluate a student against ALL schemes. Returns list of results."""
        results = []
        for scheme in self.schemes:
            result = self._evaluate_scheme(student, scheme)
            results.append(result)
        return results
    
    def _evaluate_scheme(self, student: StudentProfile, scheme: dict) -> SchemeEligibilityResult:
        """Evaluate a single student against a single scheme."""
        eligibility = scheme.get('eligibility', {})
        matched = []
        failed = []
        
        # Check each condition independently using helper methods
        self._check_gender(student, eligibility, matched, failed)
        self._check_category(student, eligibility, matched, failed)
        self._check_income(student, eligibility, matched, failed)
        self._check_marks(student, eligibility, matched, failed)
        self._check_education_level(student, eligibility, matched, failed)
        self._check_course_type(student, eligibility, matched, failed)
        self._check_college_type(student, eligibility, matched, failed)
        self._check_school_background(student, eligibility, matched, failed)
        self._check_disability(student, eligibility, matched, failed)
        self._check_minority(student, eligibility, matched, failed)
        self._check_first_graduate(student, eligibility, matched, failed)
        
        is_eligible = len(failed) == 0
        reasons = []
        if is_eligible:
            reasons.append(f'Student meets all eligibility criteria for {scheme["name"]}')
        else:
            reasons = [f'Does not satisfy: {cond}' for cond in failed]
        
        return SchemeEligibilityResult(
            scheme_id=scheme['id'],
            scheme_name=scheme['name'],
            eligible=is_eligible,
            matched_conditions=matched,
            failed_conditions=failed,
            reasons=reasons
        )
    
    # --- Individual check methods ---
    # For each check:
    # - If the scheme has no constraint (empty list or None), it's a match (no restriction)
    # - If there is a constraint, check if student meets it
    
    def _check_gender(self, student, elig, matched, failed):
        allowed = elig.get('gender', [])
        if not allowed:  # No gender restriction
            matched.append('Gender: No restriction')
            return
        if student.gender in [g.lower() for g in allowed]:
            matched.append(f'Gender matches: {student.gender}')
        else:
            failed.append(f'Gender must be one of {allowed}, got {student.gender}')
    
    def _check_category(self, student, elig, matched, failed):
        allowed = elig.get('categories', [])
        if not allowed:
            matched.append('Category: No restriction')
            return
        if student.category in [c.upper() for c in allowed]:
            matched.append(f'Category matches: {student.category}')
        else:
            failed.append(f'Category must be one of {allowed}, got {student.category}')
    
    def _check_income(self, student, elig, matched, failed):
        max_income = elig.get('max_income')
        if max_income is None:
            matched.append('Income: No restriction')
            return
        if student.annual_family_income <= max_income:
            matched.append(f'Annual family income {student.annual_family_income} <= {max_income}')
        else:
            failed.append(f'Annual family income {student.annual_family_income} exceeds limit of {max_income}')
    
    def _check_marks(self, student, elig, matched, failed):
        min_marks = elig.get('min_marks')
        if min_marks is None:
            matched.append('Marks: No minimum required')
            return
        if student.marks_percentage >= min_marks:
            matched.append(f'Marks {student.marks_percentage}% >= minimum {min_marks}%')
        else:
            failed.append(f'Marks {student.marks_percentage}% below minimum {min_marks}%')
    
    def _check_education_level(self, student, elig, matched, failed):
        allowed = elig.get('education_levels', [])
        if not allowed:
            matched.append('Education level: No restriction')
            return
        if student.course_level in [l.upper() for l in allowed]:
            matched.append(f'Education level matches: {student.course_level}')
        else:
            failed.append(f'Education level must be one of {allowed}, got {student.course_level}')
    
    def _check_course_type(self, student, elig, matched, failed):
        allowed = elig.get('course_types', [])
        if not allowed:
            matched.append('Course type: No restriction')
            return
        # Case-insensitive match for course
        if student.course.upper() in [c.upper() for c in allowed]:
            matched.append(f'Course type matches: {student.course}')
        else:
            failed.append(f'Course must be one of {allowed}, got {student.course}')
    
    def _check_college_type(self, student, elig, matched, failed):
        allowed = elig.get('college_types', [])
        if not allowed:
            matched.append('College type: No restriction')
            return
        if student.college_type in [c.lower() for c in allowed]:
            matched.append(f'College type matches: {student.college_type}')
        else:
            failed.append(f'College type must be one of {allowed}, got {student.college_type}')
    
    def _check_school_background(self, student, elig, matched, failed):
        required = elig.get('school_background', [])
        if not required:
            matched.append('School background: No restriction')
            return
        if 'government' in [s.lower() for s in required] and student.government_school_background:
            matched.append('Government school background: Yes')
        elif 'government' in [s.lower() for s in required] and not student.government_school_background:
            failed.append('Government school background required')
        else:
            matched.append('School background: Condition met')
    
    def _check_disability(self, student, elig, matched, failed):
        required = elig.get('disability_required')
        if required is None:
            matched.append('Disability: No requirement')
            return
        if required and student.disability:
            matched.append('Disability status: Meets requirement')
        elif required and not student.disability:
            failed.append('Disability status required but student is not differently abled')
        else:
            matched.append('Disability: No requirement')
    
    def _check_minority(self, student, elig, matched, failed):
        required = elig.get('minority_required')
        if required is None:
            matched.append('Minority status: No requirement')
            return
        if required and student.minority:
            matched.append('Minority status: Meets requirement')
        elif required and not student.minority:
            failed.append('Minority status required but student is not from minority community')
        else:
            matched.append('Minority status: No requirement')
    
    def _check_first_graduate(self, student, elig, matched, failed):
        required = elig.get('first_graduate_required')
        if required is None:
            matched.append('First graduate: No requirement')
            return
        if required and student.first_graduate:
            matched.append('First graduate status: Meets requirement')
        elif required and not student.first_graduate:
            failed.append('First graduate status required but student is not a first-generation graduate')
        else:
            matched.append('First graduate: No requirement')
    
    def get_scheme_by_id(self, scheme_id: str) -> dict | None:
        for scheme in self.schemes:
            if scheme['id'] == scheme_id:
                return scheme
        return None
    
    def get_all_schemes(self) -> list:
        return self.schemes
