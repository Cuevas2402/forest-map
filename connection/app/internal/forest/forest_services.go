package forest

import (
	"context"

	"example.com/connection/app/pkg/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func (forest *ForestMongo) Get() (primitive.M, error) {
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

func (forest *Forest) Save() error {
	query := `
		INSERT INTO forest (name, location, latitud, longitud) VALUES ($1, $2, $3, $4);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(&forest.Name, &forest.Location, &forest.Latitud, &forest.Longitud)

	return err

}

func (forest *Forest) Get() error {
	query := `
		SELECT name, location, latitud, longitud FROM forest WHERE fid = $1;
	`

	row := db.Postgre.QueryRow(query, forest.Fid)

	err := row.Scan(&forest.Name, &forest.Location, &forest.Latitud, &forest.Longitud)

	return err

}

func GetAllForests() ([]Forest, error) {

	var forests []Forest

	query := `
		SELECT * FROM forest;
	`

	rows, err := db.Postgre.Query(query)

	if err != nil {
		return forests, err
	}

	defer rows.Close()

	for rows.Next() {

		var forest Forest

		err = rows.Scan(&forest.Fid, &forest.Name, &forest.Location, &forest.Latitud, &forest.Longitud)

		if err != nil {
			return forests, err
		}

		forests = append(forests, forest)

	}

	return forests, nil
}

func GetTreesClassesDistribution(forests []string) ([][]primitive.M, error) {
	var aggregatedResults [][]primitive.M

	for _, s := range forests {
		collection := db.Mongo.Database("forest-data").Collection(s)

		pipeline := mongo.Pipeline{
			{{Key: "$unwind", Value: "$zones"}},
			{{Key: "$unwind", Value: "$zones.trees"}},
			{{
				Key: "$group",
				Value: bson.D{
					{Key: "_id", Value: "$zones.trees.class"},
					{Key: "total", Value: bson.D{{Key: "$sum", Value: 1}}},
				},
			}},
		}

		cursor, err := collection.Aggregate(context.Background(), pipeline)
		if err != nil {
			return nil, err
		}
		defer cursor.Close(context.Background())
		var results []primitive.M
		for cursor.Next(context.Background()) {
			var result primitive.M
			if err := cursor.Decode(&result); err != nil {
				return nil, err
			}
			results = append(results, result)
		}

		if err := cursor.Err(); err != nil {
			return nil, err
		}

		aggregatedResults = append(aggregatedResults, results)
	}

	return aggregatedResults, nil
}

func GetTreesTypesDistribution(forests []string) ([][]primitive.M, error) {

	var aggregatedResults [][]primitive.M

	for _, s := range forests {
		collection := db.Mongo.Database("forest-data").Collection(s)

		pipeline := mongo.Pipeline{
			{{Key: "$unwind", Value: "$zones"}},
			{{Key: "$unwind", Value: "$zones.trees"}},
			{{
				Key: "$group",
				Value: bson.D{
					{Key: "_id", Value: "$zones.trees.species"},
					{Key: "total", Value: bson.D{{Key: "$sum", Value: 1}}},
				},
			}},
		}

		cursor, err := collection.Aggregate(context.Background(), pipeline)

		if err != nil {
			return nil, err
		}

		defer cursor.Close(context.Background())

		var results []primitive.M
		for cursor.Next(context.Background()) {
			var result primitive.M
			if err := cursor.Decode(&result); err != nil {
				return nil, err
			}
			results = append(results, result)
		}

		if err := cursor.Err(); err != nil {
			return nil, err
		}

		aggregatedResults = append(aggregatedResults, results)

	}

	return aggregatedResults, nil

}
