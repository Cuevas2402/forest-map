package routes

import (
	"net/http"

	"example.com/connection/models"
	"github.com/gin-gonic/gin"
)

func saveCompany(c *gin.Context) {
	var company models.Company

	err := c.ShouldBindJSON(&company)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = company.Save()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "company saved"})
}
