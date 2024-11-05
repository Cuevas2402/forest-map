package usermapping

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func saveUserMapping(c *gin.Context) {
	var usermapping UserMapping

	err := c.ShouldBindJSON(&usermapping)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

}
