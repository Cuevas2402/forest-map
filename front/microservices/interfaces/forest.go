package interfaces

type Forest struct {
	ID    string `json:"forest-id" bson:"forest-id"`
	Zones []Zone `json:"zones" bson:"zones"`
}
