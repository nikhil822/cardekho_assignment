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
  fuel: string;
  seats: number;
  mileage: number;
  safety_rating: number;
  features: string[];
  score: number; // overall match score, 0-100
  score_breakdown?: ScoreBreakdown;
  highlights?: string[]; // short explanation bullets
  image_url?: string;
}

export interface CarSummary {
  score_breakdown: ScoreBreakdown; // overall match score, 0-100
  cars: CarDetails[];
  
}

export interface CarSpecs {
  description?: string;
  engine?: string;
  transmission?: string;
  body_type?: string;
  boot_space_litres?: number;
  ground_clearance_mm?: number;
  airbags?: number;
  warranty?: string;
}

export interface RecommendationResponse {
  results: CarSummary[];
  count: number;
}

export type SortOption = "best_match" | "lowest_price" | "highest_safety" | "best_mileage";
