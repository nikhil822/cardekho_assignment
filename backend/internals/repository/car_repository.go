package repository

import (
	"cardekho-assignment/internals/models"
	"errors"

	"github.com/google/uuid"
)

type CarRepository interface {
	GetAll() []models.Car
	GetByID(id uuid.UUID) (*models.Car, error)
}

type carRepository struct {
	cars []models.Car
}

func NewCarRepository(cars []models.Car) CarRepository {
	return &carRepository{
		cars: cars,
	}
}

func (r *carRepository) GetAll() []models.Car {
	return r.cars
}

func (r *carRepository) GetByID(id uuid.UUID) (*models.Car, error) {
	for _, car := range r.cars {
		if car.ID == id {
			c := car
			return &c, nil
		}
	}
	return nil, errors.New("Car not found")
}
