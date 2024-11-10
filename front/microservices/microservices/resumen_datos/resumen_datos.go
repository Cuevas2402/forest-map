package resumen_datos

import (
	"context"
	"encoding/json"
	"forest-map/microservices/db_config"
	"forest-map/microservices/interfaces"
	"forest-map/microservices/utils"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

type ResumenDatos struct {
	TotalArboles   int         `json:"total_arboles"`
	AlturaPromedio float64     `json:"altura_promedio"`
	NVDIPromedio   float64     `json:"nvdi_promedio"`
	Clases         map[int]int `json:"clases"`
}

type ResumenDatosForestal struct {
	ForestName     string      `json:"forest_name"`
	TotalArboles   int         `json:"total_arboles"`
	AlturaPromedio float64     `json:"altura_promedio"`
	NVDIPromedio   float64     `json:"nvdi_promedio"`
	Clases         map[int]int `json:"clases"`
}

type ResumenDatosZona struct {
	ZoneID         string      `json:"zone_id"`
	TotalArboles   int         `json:"total_arboles"`
	AlturaPromedio float64     `json:"altura_promedio"`
	NVDIPromedio   float64     `json:"nvdi_promedio"`
	Clases         map[int]int `json:"clases"`
}

// GetResumenDatos provides a summary of all trees across all forests
func GetResumenDatos(w http.ResponseWriter, r *http.Request) {
	ctx := context.TODO()
	client := db_config.GetMongoClient()
	db := client.Database("forest-data")

	collections, err := db.ListCollectionNames(ctx, bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var totalArboles int
	var totalAltura float64
	var totalNDVI float64
	classFrequency := make(map[int]int)

	for _, collectionName := range collections {
		collection := db.Collection(collectionName)
		var forests []interfaces.Forest

		cursor, err := collection.Find(ctx, bson.M{})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer cursor.Close(ctx)

		if err = cursor.All(ctx, &forests); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		for _, forest := range forests {
			for _, zone := range forest.Zones {
				for _, tree := range zone.Trees {
					classValue := utils.ConvertToInt(tree.Class)
					classFrequency[classValue]++
					totalArboles++
					totalAltura += utils.ConvertToFloat(tree.Height)
					totalNDVI += utils.ConvertToFloat(tree.NDVI)
				}
			}
		}
	}

	resumen := ResumenDatos{
		TotalArboles:   totalArboles,
		AlturaPromedio: totalAltura / float64(totalArboles),
		NVDIPromedio:   totalNDVI / float64(totalArboles),
		Clases:         classFrequency,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resumen)
}

// GetResumenDatosForestal provides a summary of all trees in a specific forest
func GetResumenDatosForestal(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	forestName := params["forest"]

	collection := db_config.GetCollection(forestName)
	ctx := context.TODO()

	var forests []interfaces.Forest
	filter := bson.M{}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &forests); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var totalArboles int
	var totalAltura float64
	var totalNDVI float64
	classFrequency := make(map[int]int)

	for _, forest := range forests {
		for _, zone := range forest.Zones {
			for _, tree := range zone.Trees {
				classValue := utils.ConvertToInt(tree.Class)
				classFrequency[classValue]++
				totalArboles++
				totalAltura += utils.ConvertToFloat(tree.Height)
				totalNDVI += utils.ConvertToFloat(tree.NDVI)
			}
		}
	}

	resumen := ResumenDatosForestal{
		ForestName:     forestName,
		TotalArboles:   totalArboles,
		AlturaPromedio: totalAltura / float64(totalArboles),
		NVDIPromedio:   totalNDVI / float64(totalArboles),
		Clases:         classFrequency,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resumen)
}

// GetResumenDatosZona provides a summary of all trees in a specific zone within a forest
func GetResumenDatosZona(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	forestName := params["forest"]
	zoneID := params["zone"]

	collection := db_config.GetCollection(forestName)
	ctx := context.TODO()

	var forests []interfaces.Forest
	filter := bson.M{}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &forests); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var totalArboles int
	var totalAltura float64
	var totalNDVI float64
	classFrequency := make(map[int]int)

	for _, forest := range forests {
		for _, zone := range forest.Zones {
			if zone.ID == zoneID {
				for _, tree := range zone.Trees {
					classValue := utils.ConvertToInt(tree.Class)
					classFrequency[classValue]++
					totalArboles++
					totalAltura += utils.ConvertToFloat(tree.Height)
					totalNDVI += utils.ConvertToFloat(tree.NDVI)
				}
			}
		}
	}

	resumen := ResumenDatosZona{
		ZoneID:         zoneID,
		TotalArboles:   totalArboles,
		AlturaPromedio: totalAltura / float64(totalArboles),
		NVDIPromedio:   totalNDVI / float64(totalArboles),
		Clases:         classFrequency,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resumen)
}
