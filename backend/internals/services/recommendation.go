package services

import (
	"cardekho-assignment/internals/models"
	"cardekho-assignment/internals/repository"
	"math"
	"sort"
	"strings"

	"github.com/google/uuid"
)

const (
	budgetWeight  = 40.0
	seatWeight    = 20.0
	safetyWeight  = 20.0
	mileageWeight = 10.0
	featureWeight = 10.0
)

type RecommendationService interface {
	Recommend(req models.RecommendationRequest) []models.RecommendationResponse
	GetCarById(id uuid.UUID) (*models.Car, error)
}

type recommendationService struct {
	repo repository.CarRepository
}

func NewRecommendationService(repo repository.CarRepository) RecommendationService {
	return &recommendationService{
		repo: repo,
	}
}

func budgetScore(req models.RecommendationRequest, car models.Car) float64 {
	userMean := (req.BudgetMin + req.BudgetMax) / 2
	carMean := (car.MinPrice + car.MaxPrice) / 2

	// Within the user's range
	if carMean >= req.BudgetMin && carMean <= req.BudgetMax {
		return budgetWeight
	}

	// Allow 15% tolerance above or below the mean budget
	tolerance := userMean * 0.15

	diff := math.Abs(carMean - userMean)

	if diff >= tolerance {
		return 0
	}

	return budgetWeight * (1 - diff/tolerance)
}

func seatScore(req models.RecommendationRequest, car models.Car) float64 {
	if req.Seats == 0 {
		return seatWeight
	}
	if car.Seats >= req.Seats {
		return seatWeight
	}
	return 0
}

func safetyScore(req models.RecommendationRequest, car models.Car) float64 {
	if req.MinSafetyRating == 0 {
		return safetyWeight
	}
	if car.SafetyRating >= req.MinSafetyRating {
		return safetyWeight
	}
	return (car.SafetyRating / req.MinSafetyRating) * safetyWeight
}

func mileageScore(req models.RecommendationRequest, car models.Car) float64 {
	if req.Mileage == 0 {
		return mileageWeight
	}
	if car.Mileage >= req.Mileage {
		return mileageWeight
	}

	return (car.Mileage / req.Mileage) * mileageWeight
}

func featureScore(req models.RecommendationRequest, car models.Car) float64 {
	if len(req.Features) == 0 {
		return featureWeight
	}
	matched := 0
	for _, feature := range req.Features {
		if contains(car.Features, feature) {
			matched++
		}
	}
	return (float64(matched) / float64(len(req.Features))) * featureWeight
}

func contains(features []string, feature string) bool {
	for _, f := range features {
		if strings.EqualFold(f, feature) {
			return true
		}
	}
	return false
}

func scoreCar(req models.RecommendationRequest, car models.Car) float64 {
	score := 0.0

	score += budgetScore(req, car)
	score += seatScore(req, car)
	score += safetyScore(req, car)
	score += mileageScore(req, car)
	score += featureScore(req, car)

	return score
}

func passesHardConstraints(req models.RecommendationRequest, car models.Car) bool {
	if req.Seats > 0 && car.Seats < req.Seats {
		return false
	}
	if req.Fuel != "" && !strings.EqualFold(car.Fuel, req.Fuel) {
		return false
	}
	if req.BudgetMin > 0 && req.BudgetMax > 0 {
		maxAllowed := req.BudgetMax * 1.15
		if car.MaxPrice > maxAllowed {
			return false
		}
	}
	return true
}

func (s *recommendationService) Recommend(req models.RecommendationRequest) []models.RecommendationResponse {
	cars := s.repo.GetAll()
	var result []models.RecommendationResponse

	for _, car := range cars {
		if !passesHardConstraints(req, car) {
			continue
		}
		score := scoreCar(req, car)
		result = append(result, models.RecommendationResponse{
			Score: score,
			Cars:  []models.Car{car},
		})
		sort.Slice(result, func(i, j int) bool {
			return result[i].Score > result[j].Score
		})
	}

	return result
}

func (s *recommendationService) GetCarById(id uuid.UUID) (*models.Car, error) {
	return s.repo.GetByID(id)
}

func hasAllFeatures(carFeatures, requested []string) bool {
	featureMap := make(map[string]bool)

	for _, feature := range carFeatures {
		featureMap[strings.ToLower(feature)] = true
	}
	for _, feature := range requested {
		if !featureMap[strings.ToLower(feature)] {
			return false
		}
	}
	return true
}
