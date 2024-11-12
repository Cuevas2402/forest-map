package forest

import "github.com/gin-gonic/gin"

func ForestRouter(authenticated *gin.RouterGroup) {

	authenticated.GET("/api/forest", forest)

}
