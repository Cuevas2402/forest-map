package db_config

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

// Connect initializes the connection to the MongoDB
func Connect() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatalf("MONGODB_URI is not set in the environment")
	}

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	tlsConfig := &tls.Config{}
	opts := options.Client().ApplyURI(mongoURI).SetServerAPIOptions(serverAPI).SetTLSConfig(tlsConfig)

	client, err = mongo.Connect(context.TODO(), opts)
	if err != nil {
		log.Fatalf("Error connecting to MongoDB: %v", err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatalf("Error pinging MongoDB: %v", err)
	}

	fmt.Println("Successfully connected and pinged MongoDB!")
}

// GetMongoClient returns the MongoDB client
func GetMongoClient() *mongo.Client {
	return client
}

// GetCollection returns a collection from the MongoDB
func GetCollection(collectionName string) *mongo.Collection {
	return client.Database("forest-data").Collection(collectionName)
}
