package upload

import "github.com/gin-gonic/gin"

func UploadRoutes(authenticated *gin.RouterGroup) {

	authenticated.POST("/upload/csv", uploadCsv)
	authenticated.POST("/upload/img", uploadImg)

}
