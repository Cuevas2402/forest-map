package interfaces

type Tree struct {
	ID          string      `json:"id" bson:"id"`
	ImageID     interface{} `json:"image_id" bson:"image_id"`
	Species     string      `json:"species" bson:"species"`
	XMin        interface{} `json:"xmin" bson:"xmin"`
	XMax        interface{} `json:"xmax" bson:"xmax"`
	YMin        interface{} `json:"ymin" bson:"ymin"`
	YMax        interface{} `json:"ymax" bson:"ymax"`
	Height      interface{} `json:"tree_height" bson:"tree_height"`
	Class       interface{} `json:"class" bson:"class"`
	NDVI        interface{} `json:"ndvi_value" bson:"ndvi_value"`
	Coordinates []struct {
		X float64 `json:"x" bson:"x"`
		Y float64 `json:"y" bson:"y"`
	} `json:"coordinates" bson:"coordinates"`
}
