package main

import (
	"example.com/connection/db"
	"example.com/connection/routes"
	"github.com/gin-gonic/gin"
)

func main() {

	db.InitDB()

	server := gin.Default()

	routes.RegisterRoutes(server)

	server.Run(":8080")

}
