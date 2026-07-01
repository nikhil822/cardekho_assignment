package models

import (
	"encoding/json"
	"os"

	"github.com/google/uuid"
)

type Car struct {
	ID           uuid.UUID `json:"id"`
	Make         string    `json:"make"`
	Model        string    `json:"model"`
	Variant      string    `json:"variant"`
	MinPrice     float64   `json:"min_price"`
	MaxPrice     float64   `json:"max_price"`
	BodyType     string    `json:"body_type"`
	Fuel         string    `json:"fuel"`
	Seats        int       `json:"seats"`
	Mileage      float64   `json:"mileage"`
	SafetyRating float64   `json:"safety_rating"`
	Features     []string  `json:"features"`
}

func LoadCars(path string) ([]Car, error) {
	file, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var cars []Car
	if err := json.Unmarshal(file, &cars); err != nil {
		return nil, err
	}

	return cars, nil
}
