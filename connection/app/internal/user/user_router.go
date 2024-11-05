package user

import "github.com/gin-gonic/gin"

func LoginRoute(server *gin.Engine) {

	server.POST("/api/auth/login", authenticate)

}

func UserRoutes(authenticated *gin.RouterGroup) {

	authenticated.GET("/api/user", user)
	authenticated.GET("/api/users", users)
	authenticated.POST("/api/auth/register", register)

	authenticated.GET("/api/perfiles", profiles)
	authenticated.GET("/api/perfiles/:id", profile)

}
