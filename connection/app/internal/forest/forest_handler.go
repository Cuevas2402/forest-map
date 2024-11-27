package forest

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func forestmongo(c *gin.Context) {

	var forest ForestMongo

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

func saveForest(c *gin.Context) {
	var forest Forest

	err := c.ShouldBindJSON(&forest)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = forest.Save()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "forest": forest})

}

func forest(c *gin.Context) {

	var forest Forest

	err := c.ShouldBindBodyWithJSON(&forest)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = forest.Get()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "forest": forest})

}

func forests(c *gin.Context) {

	forests, err := GetAllForests()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"messsage": "success", "forests": forests})
}

func getTreesClassesDistribution(c *gin.Context) {

	var forests ForestRequest

	err := c.ShouldBindBodyWithJSON(&forests)

	fmt.Println(forests)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	results, err := GetTreesClassesDistribution(forests.Names)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "classes": results})

}

func getMapaData(c *gin.Context) {

	forests, err := GetAllForests()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	var names []string

	for i := range forests {

		names = append(names, forests[i].Name)

	}

	results, err := GetTreesClassesDistribution(names)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "forests": forests, "classes": results})

}
