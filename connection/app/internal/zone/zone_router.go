package zone

import "github.com/gin-gonic/gin"

func ZoneRouter(authenticated *gin.RouterGroup) {
	authenticated.POST("/api/zone", saveZone)
	authenticated.GET("/api/zone", zone)
}
