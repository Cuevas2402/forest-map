package forest

import "go.mongodb.org/mongo-driver/bson/primitive"

type Coordinate struct {
	X float64 `bson:"x"`
	Y float64 `bson:"y"`
}

type Tree struct {
	ID          primitive.ObjectID `bson:"id,omitempty"`
	ImageID     int                `bson:"image_id"`
	Species     string             `bson:"species"`
	XMin        int                `bson:"xmin"`
	XMax        int                `bson:"xmax"`
	YMin        int                `bson:"ymin"`
	YMax        int                `bson:"ymax"`
	TreeHeight  float64            `bson:"tree_height"`
	Class       int                `bson:"class"`
	NDVIValue   float64            `bson:"ndvi_value"`
	Coordinates []Coordinate       `bson:"coordinates"`
}

type Zone struct {
	IDZone string `bson:"id_zone"`
	Trees  []Tree `bson:"trees"`
}

type Forest struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	ForestID string             `bson:"forest-id"`
	Zones    []Zone             `bson:"zones"`
}
