package handlers

import (
	"cardekho-assignment/internals/models"
	"cardekho-assignment/internals/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CarHandler struct {
	service services.RecommendationService
}

func NewCarHandler(service services.RecommendationService) *CarHandler {
	return &CarHandler{
		service: service,
	}
}

func (h *CarHandler) RecommendCars(c *gin.Context) {
	var req models.RecommendationRequest

	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	response := h.service.Recommend(req)
	c.JSON(http.StatusOK, response)
}

func (h *CarHandler) GetCarById(c *gin.Context) {
	id := c.Param("id")

	carId, err := uuid.Parse(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid car id",
		})
		return
	}

	car ,err := h.service.GetCarById(carId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "car not found",
		})
		return
	}
	c.JSON(http.StatusOK, car)
}