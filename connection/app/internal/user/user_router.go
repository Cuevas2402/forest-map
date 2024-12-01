package user

import "github.com/gin-gonic/gin"

func LoginRoute(server *gin.Engine) {

	server.POST("/api/auth/login", authenticate)
	server.GET("/api/test/users", users)

}

func UserRoutes(authenticated *gin.RouterGroup) {

	authenticated.GET("/api/user", user)
	authenticated.DELETE("/api/user", deleteUser)
	authenticated.PUT("/api/user", updateUser)
	authenticated.GET("/api/users", users)
	authenticated.POST("/api/auth/register", register)
	authenticated.GET("/api/user/:uid", getUser)

	authenticated.GET("/api/perfiles", profiles)
	authenticated.GET("/api/perfiles/:id", profile)
	authenticated.POST("/api/register/user", registerUserWithMapping)

}
