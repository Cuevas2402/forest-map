package usermapping

import "github.com/gin-gonic/gin"

func UserMappingRouter(authenticated *gin.RouterGroup) {

	authenticated.POST("/api/usermapping", saveUserMapping)

}
