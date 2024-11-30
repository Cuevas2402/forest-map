package forest

import "github.com/gin-gonic/gin"

func ForestRouter(authenticated *gin.RouterGroup) {

	authenticated.GET("/api/mongo/forest", forestmongo)
	authenticated.POST("/api/forest", saveForest)
	authenticated.GET("/api/forest", forest)
	authenticated.GET("/api/forests", forests)
	authenticated.POST("/api/forest/trees/classes", getTreesClassesDistribution)
	authenticated.GET("/api/forests/map", getMapaData)
	authenticated.POST("/api/forest/info", getForestInfo)

}
