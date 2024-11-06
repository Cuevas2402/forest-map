package middlewares

import (
	"log"
	"net/http"

	"example.com/connection/app/pkg/utils"
	"github.com/gin-gonic/gin"
)

func Authenticate(context *gin.Context) {

	token := context.Request.Header.Get("Authorization")

	if token == "" {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Not Authorized"})
		return
	}

	if len(token) < 7 && token[0:7] != "Bearer " {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Not Authorized"})
		return
	}

	userId, err := utils.ValidateToken(token[7:])

	log.Print(token[7:])

	if err != nil {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		return
	}

	context.Set("userId", userId)

	context.Next()

}
