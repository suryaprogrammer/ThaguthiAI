from pydantic import BaseModel, Field, field_validator
from typing import Optional

class StudentProfile(BaseModel):
    """
    Model representing a student profile for scheme evaluation.
    """
    name: str
    age: int = Field(..., ge=15, le=45)
    gender: str
    category: str
    annual_family_income: float = Field(..., ge=0)
    marks_percentage: float = Field(..., ge=0, le=100)
    year_of_study: int = Field(..., ge=1, le=8)
    course: str
    course_level: str
    college_type: str
    government_school_background: bool
    disability: bool
    disability_percentage: float = Field(default=0, ge=0, le=100)
    minority: bool
    first_graduate: bool
    district: str
    state: str = 'Tamil Nadu'

    @field_validator('gender')
    @classmethod
    def validate_gender(cls, v: str) -> str:
        v_lower = v.lower()
        if v_lower not in ('male', 'female', 'other'):
            raise ValueError("Gender must be 'male', 'female', or 'other'")
        return v_lower
        
    @field_validator('category')
    @classmethod
    def validate_category(cls, v: str) -> str:
        if not v:
            return 'OC'
        cleaned = v.strip().upper()
        if cleaned in ('MBC/DNC', 'MBC_DNC', 'MBC-DNC', 'MBC DNC', 'MBC & DNC', 'MBC AND DNC'):
            return 'MBC/DNC'
        return cleaned

    @field_validator('course_level')
    @classmethod
    def validate_course_level(cls, v: str) -> str:
        return v.upper()

    @field_validator('college_type')
    @classmethod
    def validate_college_type(cls, v: str) -> str:
        v_clean = v.strip().lower()
        if v_clean in ('govt', 'government', 'government college'):
            return 'government'
        elif v_clean in ('aided', 'govt-aided', 'government-aided', 'government aided'):
            return 'aided'
        elif v_clean in ('self-financing-government-quota', 'self_financing_government_quota', 'self financing government quota', 'government quota'):
            return 'self_financing_government_quota'
        elif v_clean in ('private', 'self-financing', 'private/self-financing', 'private_self_financing'):
            return 'private_self_financing'
        return v_clean
        
    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Karthik",
                "age": 20,
                "gender": "male",
                "category": "MBC",
                "annual_family_income": 150000.0,
                "marks_percentage": 85.5,
                "year_of_study": 2,
                "course": "B.E Computer Science",
                "course_level": "UG",
                "college_type": "government",
                "government_school_background": True,
                "disability": False,
                "disability_percentage": 0.0,
                "minority": False,
                "first_graduate": True,
                "district": "Chennai",
                "state": "Tamil Nadu"
            }
        }
    }

class ProfileResponse(BaseModel):
    """
    Model for responding to a student profile submission.
    """
    success: bool
    message: str
    profile_id: Optional[str] = None
