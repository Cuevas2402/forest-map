package main

import (
	"os"
	"time"

	"example.com/connection/db"
	"example.com/connection/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {

	err := godotenv.Load()

	if err != nil {
		panic("Could not load env")
	}

	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", "/Users/juancuevas/Documents/forest-map/credentials.json")

}

func main() {

	db.InitMongo()
	db.InitPg()

	server := gin.Default()

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.RegisterRoutes(server)

	server.Run(":8080")

}
