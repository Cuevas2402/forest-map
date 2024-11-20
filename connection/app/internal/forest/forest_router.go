package forest

import "github.com/gin-gonic/gin"

func ForestRouter(authenticated *gin.RouterGroup) {

	authenticated.GET("/api/mongo/forest", forestmongo)
	authenticated.POST("/api/forest", saveForest)
	authenticated.GET("/api/forest", forest)
	authenticated.GET("/api/forests", forests)

}
