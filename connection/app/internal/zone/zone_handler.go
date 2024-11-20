package zone

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func saveZone(c *gin.Context) {
	var zone Zone

	err := c.ShouldBindBodyWithJSON(&zone)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = zone.Save()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "zone": zone})

}

func zone(c *gin.Context) {
	var zone Zone

	err := c.ShouldBindBodyWithJSON(&zone)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = zone.Get()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "zone": zone})

}
