package forest

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func forest(c *gin.Context) {

	var forest Forest

	err := c.ShouldBindJSON(&forest)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"messag": err.Error()})
		return
	}

	result, err := forest.Get()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "forest": result})

}
