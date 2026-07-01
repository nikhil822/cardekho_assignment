package models

import "github.com/google/uuid"

type RecommendationRequest struct {
	BudgetMin       float64  `json: "budget_min"`
	BudgetMax       float64  `json:"budget_max"`
	BodyType        string   `json:"body_type"`
	Fuel            string   `json:"fuel"`
	Mileage         float64  `json:"mileage"`
	Seats           int      `json:"seats"`
	MinSafetyRating float64  `json:"min_safety_rating"`
	Features        []string `json:"features"`
}

type CarSummary struct {
	ID       uuid.UUID `json:"id"`
	Make     string    `json:"make"`
	Model    string    `json:"model"`
	Variant  string    `json:"variant"`
	MinPrice float64   `json:"min_price"`
	MaxPrice float64   `json:"max_price"`
}

type RecommendationResponse struct {
	Score float64 `json:"score"`
	Cars  []Car   `json:"cars"`
}
