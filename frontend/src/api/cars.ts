import { apiClient } from "./client";
import type {
  CarDetails,
  RecommendationResult,
  RecommendationFilters,
  RecommendationResponse,
} from "../types/car";

// Maps our internal filter shape to the backend's documented request body.
function toRecommendPayload(filters: RecommendationFilters) {
  return {
    budget_min: filters.budget_min,
    budget_max: filters.budget_max,
    ...(filters.seats ? { seats: filters.seats } : {}),
    ...(filters.fuel && filters.fuel !== "Any" ? { fuel: filters.fuel } : {}),
    ...(filters.min_safety_rating ? { min_safety_rating: filters.min_safety_rating } : {}),
    ...(filters.min_mileage ? { min_mileage: filters.min_mileage } : {}),
    ...(filters.features.length ? { features: filters.features } : {}),
    ...(filters.priorities.length ? { priorities: filters.priorities } : {}),
  };
}

export async function fetchRecommendations(
  filters: RecommendationFilters
): Promise<RecommendationResult[]> {
  const payload = toRecommendPayload(filters);
  const data = await apiClient.post<RecommendationResponse | RecommendationResult[]>(
    "/cars/recommend",
    payload
  );
  // Be tolerant of either a bare array or a { results, count } envelope.
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function fetchCarDetails(id: string): Promise<CarDetails> {
  return apiClient.get<CarDetails>(`/cars/${id}`);
}
