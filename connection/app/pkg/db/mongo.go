package db

import (
	"context"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Mongo *mongo.Client

func InitMongo() {

	var err error

	uri := os.Getenv("MONGO_URI")

	if uri == "" {

		panic("Could not connect to mongo")

	}

	clientOptions := options.Client().ApplyURI(uri).SetServerSelectionTimeout(30 * time.Second)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	Mongo, err = mongo.Connect(ctx, clientOptions)

	if err != nil {

		panic("No se pudo conectar a mongo")

	}

}
