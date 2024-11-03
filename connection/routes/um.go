package routes

import (
	"net/http"

	"example.com/connection/models"
	"github.com/gin-gonic/gin"
)

func saveUserMapping(c *gin.Context) {
	var usermapping models.UserMapping

	err := c.ShouldBindJSON(&usermapping)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

}
