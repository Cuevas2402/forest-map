package company

import "github.com/gin-gonic/gin"

func CompanyRoutes(authenticated *gin.RouterGroup) {

	authenticated.POST("/api/company", saveCompany)
	authenticated.GET("/api/companies", companies)

}
