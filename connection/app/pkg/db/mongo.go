package db

import (
	"context"
	"os"

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

	clientOptions := options.Client().ApplyURI(uri)

	Mongo, err = mongo.Connect(context.TODO(), clientOptions)

	if err != nil {

		panic("No se pudo conectar a mongo")

	}

}
