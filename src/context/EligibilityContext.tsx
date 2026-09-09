/**
 * EligibilityContext — shares form data and API results across pages.
 *
 * Flow:  EligibilityFormPage  →  AnalysisPage  →  ResultsPage
 *        (fills form)           (calls API)       (reads results)
 */
import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type {
  StudentProfile,
  RecommendationResponse,
  ExplanationResponse,
  BackendScheme,
} from "../services/api";
import {
  getRecommendation,
  getExplanation,
  getSchemes,
} from "../services/api";

interface EligibilityState {
  /** The student profile built by the form */
  profile: StudentProfile | null;
  /** Full recommendation result from the backend */
  recommendation: RecommendationResponse | null;
  /** AI explanation from the backend */
  explanation: ExplanationResponse | null;
  /** All schemes from the backend (for directory/details pages) */
  allSchemes: BackendScheme[];
  /** Loading flags */
  loading: boolean;
  loadingExplanation: boolean;
  loadingSchemes: boolean;
  /** Error messages */
  error: string | null;
}

interface EligibilityContextValue extends EligibilityState {
  setProfile: (p: StudentProfile) => void;
  /** Run the full pipeline: recommendation + explanation */
  runAnalysis: (profile: StudentProfile) => Promise<void>;
  /** Alias for runAnalysis */
  fetchRecommendations: (profile: StudentProfile) => Promise<void>;
  /** Fetch AI explanation separately */
  fetchExplanation: () => Promise<void>;
  /** Fetch all schemes for the directory */
  fetchSchemes: () => Promise<void>;
  /** Reset everything */
  reset: () => void;
}

const EligibilityContext = createContext<EligibilityContextValue | null>(null);

export function EligibilityProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<StudentProfile | null>(() => {
    try {
      const saved = sessionStorage.getItem("thaguthi_profile");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [recommendation, setRecommendationState] =
    useState<RecommendationResponse | null>(() => {
      try {
        const saved = sessionStorage.getItem("thaguthi_recommendation");
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    });

  const [explanation, setExplanation] =
    useState<ExplanationResponse | null>(null);
  const [allSchemes, setAllSchemes] = useState<BackendScheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [loadingSchemes, setLoadingSchemes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setProfile = useCallback((p: StudentProfile) => {
    setProfileState(p);
    try {
      sessionStorage.setItem("thaguthi_profile", JSON.stringify(p));
    } catch {
      /* ignore storage error */
    }
  }, []);

  const setRecommendation = useCallback((rec: RecommendationResponse | null) => {
    setRecommendationState(rec);
    try {
      if (rec) {
        sessionStorage.setItem("thaguthi_recommendation", JSON.stringify(rec));
      } else {
        sessionStorage.removeItem("thaguthi_recommendation");
      }
    } catch {
      /* ignore storage error */
    }
  }, []);

  const runAnalysis = useCallback(async (p: StudentProfile) => {
    setLoading(true);
    setError(null);
    setProfile(p);
    setRecommendation(null);
    setExplanation(null);
    try {
      const rec = await getRecommendation(p);
      setRecommendation(rec);

      // Also fetch explanation in background (non-blocking)
      getExplanation({
        student_profile: p as unknown as Record<string, unknown>,
        eligibility_result: {
          eligible_schemes: rec.eligible_schemes,
          not_eligible_schemes: rec.not_eligible_schemes,
          total_eligible: rec.eligible_schemes.length,
          total_not_eligible: rec.not_eligible_schemes.length,
        },
        recommendation_result: {
          recommended_schemes: rec.recommended_schemes,
          total_benefit: rec.total_benefit,
          recommendation_reason: rec.recommendation_reason,
        },
      })
        .then(setExplanation)
        .catch(() => {
          /* explanation is optional */
        });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to check eligibility. Is the backend running?"
      );
    } finally {
      setLoading(false);
    }
  }, [setProfile, setRecommendation]);

  const fetchExplanation = useCallback(async () => {
    if (!profile || !recommendation) return;
    setLoadingExplanation(true);
    try {
      const exp = await getExplanation({
        student_profile: profile as unknown as Record<string, unknown>,
        eligibility_result: {
          eligible_schemes: recommendation.eligible_schemes,
          not_eligible_schemes: recommendation.not_eligible_schemes,
          total_eligible: recommendation.eligible_schemes.length,
          total_not_eligible: recommendation.not_eligible_schemes.length,
        },
        recommendation_result: {
          recommended_schemes: recommendation.recommended_schemes,
          total_benefit: recommendation.total_benefit,
          recommendation_reason: recommendation.recommendation_reason,
        },
      });
      setExplanation(exp);
    } catch {
      /* optional */
    } finally {
      setLoadingExplanation(false);
    }
  }, [profile, recommendation]);

  const fetchSchemes = useCallback(async () => {
    if (allSchemes.length > 0) return; // already loaded
    setLoadingSchemes(true);
    try {
      const res = await getSchemes();
      setAllSchemes(res.schemes);
    } catch {
      /* non-blocking */
    } finally {
      setLoadingSchemes(false);
    }
  }, [allSchemes.length]);

  const reset = useCallback(() => {
    setProfileState(null);
    setRecommendationState(null);
    setExplanation(null);
    setError(null);
    try {
      sessionStorage.removeItem("thaguthi_profile");
      sessionStorage.removeItem("thaguthi_recommendation");
    } catch {
      /* ignore storage error */
    }
  }, []);

  return (
    <EligibilityContext.Provider
      value={{
        profile,
        recommendation,
        explanation,
        allSchemes,
        loading,
        loadingExplanation,
        loadingSchemes,
        error,
        setProfile,
        runAnalysis,
        fetchRecommendations: runAnalysis,
        fetchExplanation,
        fetchSchemes,
        reset,
      }}
    >
      {children}
    </EligibilityContext.Provider>
  );
}

export function useEligibility() {
  const ctx = useContext(EligibilityContext);
  if (!ctx) {
    throw new Error("useEligibility must be used within EligibilityProvider");
  }
  return ctx;
}
