package forest

import (
	"context"

	"example.com/connection/app/pkg/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (forest *Forest) Get() (primitive.M, error) {
	//collection := db.Mongo.Database("forest-data").Collection("Viken")

	collection := db.Mongo.Database("forest-data").Collection("forest1")

	//cursor, err := collection.Find(context.Background(), bson.M{"forest-id": forest.ForestID})

	cursor, err := collection.Find(context.Background(), bson.M{})

	if err != nil {
		return nil, err
	}

	defer cursor.Close(context.Background())

	var result bson.M

	cursor.Next(context.Background())

	err = cursor.Decode(&result)

	if err != nil {
		return nil, err
	}

	return result, nil

}
