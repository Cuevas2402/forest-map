package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(server *gin.Engine) {
	server.POST("/u/auth", userAuth)
	server.POST("/a/auth", adminAuth)
}
