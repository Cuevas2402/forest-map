package utils

import (
	"fmt"
	"strconv"
)

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

type Zone struct {
	ID    string `json:"id_zone" bson:"id_zone"`
	Trees []Tree `json:"trees" bson:"trees"`
}

type Forest struct {
	ID    string `json:"forest-id" bson:"forest-id"`
	Zones []Zone `json:"zones" bson:"zones"`
}

// ConvertToInt ensures that the field is converted to int if it is string
func ConvertToInt(field interface{}) int {
	switch v := field.(type) {
	case string:
		intVal, err := strconv.Atoi(v)
		if err != nil {
			fmt.Printf("Error converting string to int: %v\n", err)
			return 0
		}
		return intVal
	case int:
		return v
	case int32:
		return int(v)
	case float64:
		return int(v)
	default:
		fmt.Printf("Unknown type: %T, value: %v\n", v, v)
		return 0
	}
}

// ConvertToFloat ensures that the field is converted to float64 if it is string
func ConvertToFloat(field interface{}) float64 {
	switch v := field.(type) {
	case string:
		floatVal, err := strconv.ParseFloat(v, 64)
		if err != nil {
			fmt.Printf("Error converting string to float: %v\n", err)
			return 0
		}
		return floatVal
	case float64:
		return v
	case int:
		return float64(v)
	default:
		fmt.Printf("Unknown type: %T, value: %v\n", v, v)
		return 0
	}
}
