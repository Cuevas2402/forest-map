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

func getForestInfo(c *gin.Context) {

	var forest Forest

	err := c.ShouldBindJSON(&forest)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = forest.Get()

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	classes, err := GetTreesClassesDistribution([]string{forest.Name})

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	types, err := GetTreesTypesDistribution([]string{forest.Name})

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "forest": forest, "classes": classes, "types": types})

}

func getForestZone(c *gin.Context) {
	var jsonData map[string]interface{}

	err := c.ShouldBindJSON(&jsonData)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	name, ok := jsonData["Name"].(string)
	if !ok {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid Name"})
		return
	}

	zid, ok := jsonData["Zid"].(string)
	if !ok {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid Zid"})
		return
	}

	types, err := GetForestTypesByZone(name, zid)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	fmt.Println("Types:", types)

	classes, err := GetForestClassesByZone(name, zid)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	fmt.Println("Classes:", classes)

	c.JSON(http.StatusOK, gin.H{"message": "success", "types": types, "classes": classes})
}
