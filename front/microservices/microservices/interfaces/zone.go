package interfaces

type Zone struct {
	ID    string `json:"id_zone" bson:"id_zone"`
	Trees []Tree `json:"trees" bson:"trees"`
}
