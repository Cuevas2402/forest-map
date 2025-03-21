package company

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func saveCompany(c *gin.Context) {
	var company Company

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

func companies(c *gin.Context) {

	companies, err := getCompanies()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "companies": companies})
}
