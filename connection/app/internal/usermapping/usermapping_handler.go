package usermapping

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func usermapping(c *gin.Context) {
	var usermapping UserMapping

	err := c.ShouldBindJSON(&usermapping)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err = usermapping.Save(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"messag": "sucess", "usermapping": usermapping})

}

func deleteUserMapping(c *gin.Context) {
	var usermapping UserMapping

	err := c.ShouldBindJSON(&usermapping)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = usermapping.Delete()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "usermapping": usermapping})

}

func updateUsermapping(c *gin.Context) {
	var usermapping UserMapping

	err := c.ShouldBindJSON(&usermapping)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = usermapping.Update()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "usermapping": usermapping})

}
