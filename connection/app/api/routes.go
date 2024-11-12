package api

import (
	middlewares "example.com/connection/app/api/middlawares"
	"example.com/connection/app/internal/company"
	"example.com/connection/app/internal/forest"
	"example.com/connection/app/internal/upload"
	"example.com/connection/app/internal/user"
	"example.com/connection/app/internal/usermapping"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {

	user.LoginRoute(server)

	authenticated := server.Group("/")
	authenticated.Use(middlewares.Authenticate)

	user.UserRoutes(authenticated)
	company.CompanyRoutes(authenticated)
	upload.UploadRoutes(authenticated)
	usermapping.UserMappingRouter(authenticated)
	forest.ForestRouter(authenticated)

}
