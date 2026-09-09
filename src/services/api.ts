/**
 * ThaguthiAI API Service
 * Connects the React frontend to the FastAPI backend.
 * All eligibility decisions come from the backend rule engine.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://thaguthiai-backend.onrender.com";

// ─── Request Types ───────────────────────────────────────────────

export interface StudentProfile {
  name: string;
  age: number;
  gender: string;
  category: string;
  annual_family_income: number;
  marks_percentage: number;
  year_of_study: number;
  course: string;
  course_level: string;
  college_type: string;
  government_school_background: boolean;
  disability: boolean;
  disability_percentage: number;
  minority: boolean;
  first_graduate: boolean;
  district: string;
  state: string;
}

export interface ConflictCheckRequest {
  scheme_ids: string[];
}

export interface ExplanationRequest {
  student_profile: Record<string, unknown>;
  eligibility_result: Record<string, unknown>;
  recommendation_result?: Record<string, unknown>;
}

// ─── Response Types ──────────────────────────────────────────────

export interface SchemeEligibility {
  gender: string[];
  categories: string[];
  max_income: number | null;
  min_marks: number | null;
  school_background: string[];
  education_levels: string[];
  course_types: string[];
  college_types: string[];
  disability_required: boolean | null;
  minority_required: boolean | null;
  first_graduate_required: boolean | null;
}

export interface BackendScheme {
  id: string;
  name: string;
  department: string;
  description: string;
  benefit: string;
  benefit_amount: number;
  frequency: string;
  demo: boolean;
  data_status: string;
  eligibility: SchemeEligibility;
  conflicts_with: string[];
  official_source: string;
  last_verified: string;
}

export interface SchemesListResponse {
  schemes: BackendScheme[];
  total: number;
}

export interface SchemeEligibilityResult {
  scheme_id: string;
  scheme_name: string;
  eligible: boolean;
  matched_conditions: string[];
  failed_conditions: string[];
  reasons: string[];
}

export interface EligibilityResponse {
  eligible_schemes: SchemeEligibilityResult[];
  not_eligible_schemes: SchemeEligibilityResult[];
  total_eligible: number;
  total_not_eligible: number;
}

export interface ConflictPair {
  scheme_a: string;
  scheme_b: string;
  reason: string;
}

export interface ConflictResponse {
  conflicts_found: boolean;
  conflicts: ConflictPair[];
  valid_scheme_ids: string[];
}

export interface RecommendedScheme {
  scheme_id: string;
  scheme_name: string;
  benefit_amount: number;
  benefit: string;
  score: number;
  reasons: string[];
}

export interface RecommendationResponse {
  student: Record<string, unknown>;
  eligible_schemes: SchemeEligibilityResult[];
  not_eligible_schemes: SchemeEligibilityResult[];
  conflicts: ConflictPair[];
  recommended_schemes: RecommendedScheme[];
  total_benefit: number;
  recommendation_reason: string;
  alternative_options: RecommendedScheme[][];
}

export interface ExplanationResponse {
  explanation: string;
  important_notes: string[];
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  profile_id: string | null;
}

export interface HealthResponse {
  status: string;
  service: string;
  mongodb: string;
}

// ─── API Error ───────────────────────────────────────────────────

export class ApiError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

// ─── Helper ──────────────────────────────────────────────────────

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      let detail = `Request failed with status ${response.status}`;
      try {
        const body = await response.json();
        detail = body.detail || JSON.stringify(body);
      } catch {
        // response was not JSON
      }
      throw new ApiError(response.status, detail);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(0, `Network error: Unable to reach the backend at ${API_BASE_URL}. Make sure the FastAPI server is running.`);
  }
}

// ─── API Functions ───────────────────────────────────────────────

/** Health check */
export async function getHealth(): Promise<HealthResponse> {
  return request<HealthResponse>("/health");
}

/** Get all schemes */
export async function getSchemes(): Promise<SchemesListResponse> {
  return request<SchemesListResponse>("/api/schemes");
}

/** Get a single scheme by ID */
export async function getSchemeById(id: string): Promise<BackendScheme> {
  return request<BackendScheme>(`/api/schemes/${encodeURIComponent(id)}`);
}

/** Validate and optionally save a student profile */
export async function submitProfile(
  profile: StudentProfile
): Promise<ProfileResponse> {
  return request<ProfileResponse>("/api/profile", {
    method: "POST",
    body: JSON.stringify(profile),
  });
}

/** Check eligibility against all schemes */
export async function checkEligibility(
  profile: StudentProfile
): Promise<EligibilityResponse> {
  return request<EligibilityResponse>("/api/eligibility/check", {
    method: "POST",
    body: JSON.stringify(profile),
  });
}

/** Check conflicts among scheme IDs */
export async function checkConflicts(
  schemeIds: string[]
): Promise<ConflictResponse> {
  return request<ConflictResponse>("/api/conflicts/check", {
    method: "POST",
    body: JSON.stringify({ scheme_ids: schemeIds }),
  });
}

/** Get full recommendation (eligibility + conflicts + ranking) */
export async function getRecommendation(
  profile: StudentProfile
): Promise<RecommendationResponse> {
  return request<RecommendationResponse>("/api/recommendation", {
    method: "POST",
    body: JSON.stringify(profile),
  });
}

/** Get AI explanation of results */
export async function getExplanation(
  req: ExplanationRequest
): Promise<ExplanationResponse> {
  return request<ExplanationResponse>("/api/explain", {
    method: "POST",
    body: JSON.stringify(req),
  });
}
