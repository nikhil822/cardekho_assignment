export type FuelType = "Any" | "Petrol" | "Diesel" | "Hybrid" | "Electric";

export type PriorityKey = "price" | "safety" | "mileage" | "features" | "space";

export interface RecommendationFilters {
  budget_min: number;
  budget_max: number;
  seats: number | null; // null = "Any"
  fuel: FuelType;
  min_safety_rating: number | null; // null = "Any"
  min_mileage: number;
  features: string[];
  priorities: PriorityKey[]; // max 2
}

export interface ScoreBreakdown {
  budget?: number;
  safety?: number;
  mileage?: number;
  features?: number;
  space?: number;
  [key: string]: number | undefined;
}

export interface CarDetails {
  id: string;
  make: string;
  model: string;
  variant: string;
  min_price: number;
  max_price: number;
  body_type: string;
  fuel: string;
  seats: number;
  mileage: number;
  safety_rating: number;
  features: string[];
  score?: number; // present on some recommendation/detail variants
  score_breakdown?: ScoreBreakdown;
  highlights?: string[]; // short explanation bullets
  image_url?: string;
  description?: string;
  engine?: string;
  transmission?: string;
  boot_space_litres?: number;
  ground_clearance_mm?: number;
  airbags?: number;
  warranty?: string;
}

export interface RecommendationResult {
  score: number; // overall match score, 0-100
  score_breakdown?: ScoreBreakdown;
  cars: CarDetails[];
}

export interface RecommendationResponse {
  results: RecommendationResult[];
  count: number;
}

export type SortOption = "best_match" | "lowest_price" | "highest_safety" | "best_mileage";
