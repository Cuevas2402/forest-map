package forest

import (
	"context"

	"example.com/connection/app/pkg/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
		INSERT INTO forest (name, location) VALUES ($1, $2);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(&forest.Name, &forest.Location)

	return err

}

func (forest *Forest) Get() error {
	query := `
		SELECT name, location FROM forest WHERE fid = $1;
	`

	row := db.Postgre.QueryRow(query, forest.Fid)

	err := row.Scan(&forest.Name, &forest.Location)

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

		err = rows.Scan(&forest.Fid, &forest.Name, &forest.Location)

		if err != nil {
			return forests, err
		}

		forests = append(forests, forest)

	}

	return forests, nil
}
