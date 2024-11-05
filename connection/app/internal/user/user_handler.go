package user

import (
	"fmt"
	"net/http"

	"example.com/connection/app/internal/usermapping"
	"example.com/connection/app/pkg/utils"
	"github.com/gin-gonic/gin"
)

func register(context *gin.Context) {
	var user User
	err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = user.Save()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "User saved"})
}

func authenticate(context *gin.Context) {
	var user User

	err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not fetch data"})
		return
	}

	err = user.Validate()

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		return
	}

	token, err := utils.GenerateToken(user.Email, user.Uid)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not generate token"})
		return
	}

	var um usermapping.UserMapping

	um.Uid = user.Uid

	err = um.Find()

	fmt.Println(um.Rid, um.Uid, um.Cid)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"message": "Authorized",
		"token":   token,
		"uid":     um.Uid,
		"rid":     um.Rid,
		"cid":     um.Cid,
	})

}

func users(context *gin.Context) {

	users, err := getUsers()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Server error"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"users": users})

}

func user(context *gin.Context) {

	token := context.GetHeader("Authorization")

	if token == "" {
		context.JSON(http.StatusBadRequest, gin.H{})
		return
	}

	if len(token) < 7 || token[0:7] != "Bearer " {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Bad format"})
		return
	}

	token = token[7:]

	id, err := utils.ValidateToken(token)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"user": id})

}

func profile(c *gin.Context) {

}

func profiles(c *gin.Context) {

}
