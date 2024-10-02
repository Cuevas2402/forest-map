package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(server *gin.Engine) {
	server.POST("/users", registerUsers)
	server.POST("/user", registerUser)
	server.POST("/auth", authenticate)
	server.GET("/users", getUsers)
}
