import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { fetchRecommendations } from "../api/cars";
import { ApiError } from "../api/client";
import { useToast } from "./ToastContext";
import type { CarSummary, RecommendationFilters } from "../types/car";

const MAX_COMPARE = 2;

interface AppDataContextValue {
  filters: RecommendationFilters | null;
  results: CarSummary[];
  isLoading: boolean;
  error: string | null;
  runRecommendation: (filters: RecommendationFilters) => Promise<boolean>;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  isCompareFull: boolean;
  clearCompare: () => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [filters, setFilters] = useState<RecommendationFilters | null>(null);
  const [results, setResults] = useState<CarSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const runRecommendation = useCallback(
    async (nextFilters: RecommendationFilters) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchRecommendations(nextFilters);
        setResults(data);
        setFilters(nextFilters);
        return true;
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Couldn't reach the recommendation service. Check your connection and try again.";
        setError(message);
        showToast(message, "error");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [showToast]
  );

  const toggleCompare = useCallback(
    (id: string) => {
      setCompareIds((prev) => {
        if (prev.includes(id)) return prev.filter((existing) => existing !== id);
        if (prev.length >= MAX_COMPARE) {
          showToast(`You can only compare up to ${MAX_COMPARE} cars at a time.`, "info");
          return prev;
        }
        return [...prev, id];
      });
    },
    [showToast]
  );

  const clearCompare = useCallback(() => setCompareIds([]), []);

  const value = useMemo(
    () => ({
      filters,
      results,
      isLoading,
      error,
      runRecommendation,
      compareIds,
      toggleCompare,
      isCompareFull: compareIds.length >= MAX_COMPARE,
      clearCompare,
    }),
    [filters, results, isLoading, error, runRecommendation, compareIds, toggleCompare, clearCompare]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within an AppDataProvider");
  return ctx;
}
