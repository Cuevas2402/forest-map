package routes

import (
	middlewares "example.com/connection/middlawares"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {

	server.POST("/api/auth/register/users", registerUsers)
	server.GET("/api/user", getUser)
	server.POST("/api/auth/register", registerUser)
	server.POST("/api/auth/login", authenticate)

	authenticated := server.Group("/")
	authenticated.Use(middlewares.Authenticate)

	authenticated.GET("/api/perfiles", getUsers)
	authenticated.GET("/api/perfiles/:id", getUser)

	authenticated.POST("/upload/csv", uploadCsv)
	authenticated.POST("/upload/img", uploadImg)

	authenticated.POST("/api/company", saveCompany)
	authenticated.POST("/api/usermapping", saveUserMapping)
}
