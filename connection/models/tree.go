package models

import (
	"time"
)

type TreeData struct {
	IDTree           int       `json:"id_tree"`
	Species          string    `json:"species"`
	XMin             int       `json:"xmin"`
	XMax             int       `json:"xmax"`
	YMin             int       `json:"ymin"`
	YMax             int       `json:"ymax"`
	TreeHeight       float64   `json:"tree_height"`
	IDCrownMix       int       `json:"id_crownMix"`
	Class            int       `json:"class"`
	IDImagen         int       `json:"id_imagen"`
	ImagePath        string    `json:"image_path"`
	ImageDate        time.Time `json:"image_date"`
	ImageDescription string    `json:"image_description"`
	IDZone           int       `json:"id_zone"`
	NDVIValue        float64   `json:"ndvi_value"`
	Coordinate       []struct {
		X float64 `json:"x"`
		Y float64 `json:"y"`
	} `json:"coordinate"`
	TreeQuantity   int `json:"tree_quantity"`
	IDAreaForestal int `json:"id_areaForestal"`
	IDArbol        int `json:"id_arbol"`
}

type Tree struct {
	Name string `bson:"name"`
}
