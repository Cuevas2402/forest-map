package routes

import (
	middlewares "example.com/connection/middlawares"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {
	server.POST("/users", registerUsers)
	server.POST("/user", registerUser)
	server.POST("/auth", authenticate)

	authenticated := server.Group("/")
	authenticated.Use(middlewares.Authenticate)

	authenticated.GET("/users", getUsers)
	authenticated.GET("/user", getUser)
	authenticated.POST("/upload/csv", uploadCsv)
	authenticated.POST("/upload/img", uploadImg)
}
