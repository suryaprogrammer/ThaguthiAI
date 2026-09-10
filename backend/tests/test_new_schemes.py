import pytest
from app.models.student import StudentProfile
from app.rules.rule_engine import RuleEngine
from app.services.recommendation_service import RecommendationService
from app.services.eligibility_service import EligibilityService

rule_engine = RuleEngine()
rec_service = RecommendationService()
elig_service = EligibilityService()

def test_total_schemes_catalog_count():
    all_schemes = elig_service.get_all_schemes()
    assert len(all_schemes) == 37, f"Expected 37 schemes, found {len(all_schemes)}"

def test_evr_nagammai_eligible():
    student = StudentProfile(
        name="Anitha",
        age=22,
        gender="female",
        category="BC",
        annual_family_income=45000.0,
        marks_percentage=80.0,
        year_of_study=1,
        course="M.Sc Chemistry",
        course_level="PG",
        college_type="government",
        government_school_background=False,
        disability=False,
        minority=False,
        first_graduate=False,
        district="Madurai"
    )
    result = rule_engine._evaluate_scheme(student, rule_engine.get_scheme_by_id("evr_nagammai_free_education"))
    assert result.eligible is True
    assert result.scheme_id == "evr_nagammai_free_education"

def test_evr_nagammai_ineligible_due_to_income():
    student = StudentProfile(
        name="Deepa",
        age=22,
        gender="female",
        category="BC",
        annual_family_income=60000.0,  # exceeds 50k max income limit for EVR Nagammai
        marks_percentage=80.0,
        year_of_study=1,
        course="M.Sc Chemistry",
        course_level="PG",
        college_type="government",
        government_school_background=False,
        disability=False,
        minority=False,
        first_graduate=False,
        district="Madurai"
    )
    result = rule_engine._evaluate_scheme(student, rule_engine.get_scheme_by_id("evr_nagammai_free_education"))
    assert result.eligible is False
    assert any("exceeds limit" in r for r in result.reasons)

def test_requires_verification_safety_rule():
    requires_verif_ids = [
        "rimc_dehradun_scholarship",
        "pmss_scholarship",
        "post_graduate_indira_gandhi_single_girl",
        "aicte_pragati_scholarship",
        "aicte_saksham_scholarship",
        "merit_scholarship",
        "bc_mbc_polytechnic_free_education"
    ]
    
    dummy_student = StudentProfile(
        name="Test",
        age=20,
        gender="female",
        category="SC",
        annual_family_income=10000.0,
        marks_percentage=95.0,
        year_of_study=1,
        course="B.E Computer Science",
        course_level="UG",
        college_type="government",
        government_school_background=True,
        disability=True,
        disability_percentage=80.0,
        minority=True,
        first_graduate=True,
        district="Chennai"
    )
    
    for scheme_id in requires_verif_ids:
        scheme_data = rule_engine.get_scheme_by_id(scheme_id)
        assert scheme_data is not None, f"Scheme {scheme_id} should exist in catalog"
        result = rule_engine._evaluate_scheme(dummy_student, scheme_data)
        assert result.eligible is False, f"Scheme {scheme_id} requiring verification MUST NOT be eligible"
        assert result.reasons[0] == "Official eligibility criteria require verification before this scheme can be recommended."

def test_requires_verification_excluded_from_recommendations():
    dummy_student = StudentProfile(
        name="Test",
        age=20,
        gender="female",
        category="SC",
        annual_family_income=10000.0,
        marks_percentage=95.0,
        year_of_study=1,
        course="B.E Computer Science",
        course_level="UG",
        college_type="government",
        government_school_background=True,
        disability=True,
        disability_percentage=80.0,
        minority=True,
        first_graduate=True,
        district="Chennai"
    )
    
    rec_res = rec_service.get_recommendation(dummy_student)
    recommended_ids = [r.scheme_id for r in rec_res.recommended_schemes]
    
    requires_verif_ids = [
        "pmss_scholarship",
        "post_graduate_indira_gandhi_single_girl",
        "aicte_pragati_scholarship",
        "aicte_saksham_scholarship"
    ]
    for unverified_id in requires_verif_ids:
        assert unverified_id not in recommended_ids, f"Unverified scheme {unverified_id} MUST NOT be recommended"

def test_disability_reader_allowance_eligible():
    student = StudentProfile(
        name="Manoj",
        age=21,
        gender="male",
        category="OC",
        annual_family_income=300000.0,
        marks_percentage=65.0,
        year_of_study=2,
        course="B.A. History",
        course_level="UG",
        college_type="government",
        government_school_background=False,
        disability=True,
        disability_percentage=60.0,
        minority=False,
        first_graduate=False,
        district="Salem"
    )
    result = rule_engine._evaluate_scheme(student, rule_engine.get_scheme_by_id("disability_reader_allowance"))
    assert result.eligible is True

def test_disability_reader_allowance_ineligible_below_min_disability():
    student = StudentProfile(
        name="Kavitha",
        age=21,
        gender="female",
        category="OC",
        annual_family_income=300000.0,
        marks_percentage=65.0,
        year_of_study=2,
        course="B.A. History",
        course_level="UG",
        college_type="government",
        government_school_background=False,
        disability=True,
        disability_percentage=25.0,  # below 40% required
        minority=False,
        first_graduate=False,
        district="Salem"
    )
    result = rule_engine._evaluate_scheme(student, rule_engine.get_scheme_by_id("disability_reader_allowance"))
    assert result.eligible is False
