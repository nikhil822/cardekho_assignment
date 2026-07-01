package main

import (
	"cardekho-assignment/internals/handlers"
	"cardekho-assignment/internals/models"
	"cardekho-assignment/internals/repository"
	"cardekho-assignment/internals/services"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	cars, err := models.LoadCars("data/cars.json")
	if err != nil {
		log.Printf("Failed to load cars: %v", err)
	}

	log.Printf("Loaded %d cars\n", len(cars))

	carRepo := repository.NewCarRepository(cars)

	recommendationService := services.NewRecommendationService(carRepo)

	carHandler := handlers.NewCarHandler(recommendationService)

	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	router.POST("/cars/recommend", carHandler.RecommendCars)

	router.GET("/cars/:id", carHandler.GetCarById)

	log.Println("Server is running on :8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
