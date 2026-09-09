import json
import os
import logging
from pathlib import Path
from typing import List, Set
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
        possible_paths = [
            Path(__file__).parent.parent.parent / 'data' / 'schemes.json',
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
        data_status = scheme.get('data_status', '')
        if data_status.startswith('requires_verification') or scheme.get('requires_verification') is True:
            reason = f'Official eligibility criteria for {scheme["name"]} require verification.'
            return SchemeEligibilityResult(
                scheme_id=scheme['id'],
                scheme_name=scheme['name'],
                eligible=False,
                matched_conditions=[],
                failed_conditions=[reason],
                reasons=[reason]
            )

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
    
    def _get_category_equivalence_set(self, cat: str) -> Set[str]:
        """Return the category equivalence set for matching.
        Does NOT convert between distinct categories (e.g., BC stays distinct from SC/ST/MBC)."""
        c = cat.strip().upper()
        if c == 'SC':
            return {'SC'}
        elif c == 'SCA':
            return {'SCA', 'SC'}
        elif c == 'ST':
            return {'ST'}
        elif c == 'BC':
            return {'BC'}
        elif c == 'BCM':
            return {'BCM', 'BC'}
        elif c == 'MBC':
            return {'MBC', 'MBC/DNC'}
        elif c == 'DNC':
            return {'DNC', 'MBC/DNC'}
        elif c == 'MBC/DNC':
            return {'MBC', 'DNC', 'MBC/DNC'}
        elif c == 'OBC':
            return {'OBC', 'BC'}
        elif c in ('OC', 'GENERAL'):
            return {'OC', 'GENERAL'}
        return {c}

    def _check_gender(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        allowed = elig.get('gender', [])
        if not allowed:
            matched.append('Gender: No restriction')
            return
        if student.gender in [g.lower() for g in allowed]:
            matched.append(f'Gender matches: {student.gender}')
        else:
            failed.append(f'Gender must be one of {allowed}, got {student.gender}')
    
    def _check_category(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        allowed = elig.get('categories', [])
        if not allowed:
            matched.append('Category: No restriction')
            return
        
        student_set = self._get_category_equivalence_set(student.category)
        allowed_set = set()
        for cat in allowed:
            allowed_set.update(self._get_category_equivalence_set(cat))
            
        if student_set.intersection(allowed_set):
            matched.append(f'Category matches: {student.category}')
        else:
            allowed_str = ", ".join(allowed)
            failed.append(f'Category requirement not satisfied: scheme requires {allowed_str}, student is {student.category}')
    
    def _check_income(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        max_income = elig.get('max_income')
        if max_income is None:
            matched.append('Income: No restriction')
            return
        if student.annual_family_income <= max_income:
            matched.append(f'Annual family income ₹{student.annual_family_income:,.0f} <= limit of ₹{max_income:,.0f}')
        else:
            failed.append(f'Annual family income ₹{student.annual_family_income:,.0f} exceeds limit of ₹{max_income:,.0f}')
    
    def _check_marks(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        min_marks = elig.get('min_marks')
        if min_marks is None:
            matched.append('Marks: No minimum required')
            return
        if student.marks_percentage >= min_marks:
            matched.append(f'Marks {student.marks_percentage}% >= minimum {min_marks}%')
        else:
            failed.append(f'Marks {student.marks_percentage}% below minimum {min_marks}%')
    
    def _check_education_level(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        allowed = elig.get('education_levels', [])
        if not allowed:
            matched.append('Education level: No restriction')
            return
        if student.course_level in [l.upper() for l in allowed]:
            matched.append(f'Education level matches: {student.course_level}')
        else:
            failed.append(f'Education level must be one of {allowed}, got {student.course_level}')
    
    def _check_course_type(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        allowed = elig.get('course_types', [])
        if not allowed:
            matched.append('Course type: No restriction')
            return
        if student.course.upper() in [c.upper() for c in allowed]:
            matched.append(f'Course type matches: {student.course}')
        else:
            failed.append(f'Course must be one of {allowed}, got {student.course}')
    
    def _check_college_type(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        allowed = elig.get('college_types', [])
        if not allowed:
            matched.append('College type: No restriction')
            return
        
        st_type = student.college_type.strip().lower()
        if st_type in ('govt', 'government', 'government college'):
            st_canonical = 'government'
        elif st_type in ('aided', 'govt-aided', 'government-aided', 'government aided'):
            st_canonical = 'aided'
        elif st_type in ('self-financing-government-quota', 'self_financing_government_quota', 'self financing government quota', 'government quota'):
            st_canonical = 'self_financing_government_quota'
        elif st_type in ('private', 'self-financing', 'private/self-financing', 'private_self_financing'):
            st_canonical = 'private_self_financing'
        else:
            st_canonical = st_type

        allowed_canonical = []
        for c in allowed:
            c_clean = c.strip().lower()
            if c_clean in ('govt', 'government', 'government college'):
                allowed_canonical.append('government')
            elif c_clean in ('aided', 'govt-aided', 'government-aided', 'government aided'):
                allowed_canonical.append('aided')
            elif c_clean in ('self-financing-government-quota', 'self_financing_government_quota', 'self financing government quota', 'government quota'):
                allowed_canonical.append('self_financing_government_quota')
            elif c_clean in ('private', 'self-financing', 'private/self-financing', 'private_self_financing'):
                allowed_canonical.append('private_self_financing')
            else:
                allowed_canonical.append(c_clean)

        if st_canonical in allowed_canonical:
            matched.append(f'College type matches: {student.college_type}')
        else:
            allowed_str = ", ".join(allowed)
            failed.append(f'College type requirement not satisfied: scheme requires {allowed_str}, student institution is {student.college_type}')
    
    def _check_school_background(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        required = elig.get('school_background', [])
        if not required:
            matched.append('School background: No restriction')
            return
        if 'government' in [s.lower() for s in required] and student.government_school_background:
            matched.append('Government school background: Yes')
        elif 'government' in [s.lower() for s in required] and not student.government_school_background:
            failed.append('Government school background required but student did not attend government school')
        else:
            matched.append('School background: Condition met')
    
    def _check_disability(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        required = elig.get('disability_required')
        min_disability_pct = elig.get('min_disability_percentage')
        
        if required is None and min_disability_pct is None:
            matched.append('Disability: No requirement')
            return
            
        if required:
            if not student.disability:
                failed.append('Disability status required but student is not differently abled')
                return
                
        if min_disability_pct is not None:
            if student.disability_percentage < min_disability_pct:
                failed.append(f'Disability percentage {student.disability_percentage}% below required minimum {min_disability_pct}%')
                return
                
        matched.append('Disability status: Meets requirement')
    
    def _check_minority(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        required = elig.get('minority_required')
        if required is None or required is False:
            matched.append('Minority status: No requirement')
            return
        if student.minority:
            matched.append('Minority status: Meets requirement')
        else:
            failed.append('Minority status required but student is not from minority community')
    
    def _check_first_graduate(self, student: StudentProfile, elig: dict, matched: list, failed: list):
        required = elig.get('first_graduate_required')
        if required is None:
            matched.append('First graduate: No requirement')
            return
        if required is True:
            if student.first_graduate:
                matched.append('First graduate status: Meets requirement')
            else:
                failed.append('First graduate status required but student is not a first-generation graduate')
        elif required is False:
            if not student.first_graduate:
                matched.append('Non-first-graduate condition satisfied')
            else:
                failed.append('Scheme requires non-first-graduate student condition')
    
    def get_scheme_by_id(self, scheme_id: str) -> dict | None:
        for scheme in self.schemes:
            if scheme['id'] == scheme_id:
                return scheme
        return None
    
    def get_all_schemes(self) -> list:
        return self.schemes
