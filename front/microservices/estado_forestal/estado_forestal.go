package estado_forestal

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

func GetForestStatus(w http.ResponseWriter, r *http.Request) {
	ctx := context.TODO()
	client := db_config.GetMongoClient()
	db := client.Database("forest-data")

	collections, err := db.ListCollectionNames(ctx, bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	type Promedio struct {
		ForestName    string  `json:"forest_name"`
		MostFreqClass int     `json:"most_freq_class"`
		AvgNDVI       float64 `json:"avg_ndvi"`
	}

	var promedios []Promedio

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

		classFrequency := make(map[int]int)
		var totalNDVI float64
		var count int

		for _, forest := range forests {
			for _, zone := range forest.Zones {
				for _, tree := range zone.Trees {
					classValue := utils.ConvertToInt(tree.Class)
					if classValue != 0 { // ensure classValue is non-zero
						classFrequency[classValue]++
					}
					totalNDVI += utils.ConvertToFloat(tree.NDVI)
					count++
				}
			}
		}

		mostFreqClass := getMostFrequentClass(classFrequency)

		if count > 0 {
			promedios = append(promedios, Promedio{
				ForestName:    collectionName,
				MostFreqClass: mostFreqClass,
				AvgNDVI:       totalNDVI / float64(count),
			})
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(promedios)
}

// GetForestZoneStatus returns the most frequent class and average NDVI for all zones in a forest
func GetForestZoneStatus(w http.ResponseWriter, r *http.Request) {
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

	type Promedio struct {
		ZoneID        string  `json:"zone_id"`
		MostFreqClass int     `json:"most_freq_class"`
		AvgNDVI       float64 `json:"avg_ndvi"`
	}

	var promedios []Promedio

	for _, forest := range forests {
		for _, zone := range forest.Zones {
			classFrequency := make(map[int]int)
			var totalNDVI float64
			var count int

			for _, tree := range zone.Trees {
				classValue := utils.ConvertToInt(tree.Class)
				if classValue != 0 { // Ignore class 0
					classFrequency[classValue]++
				}
				totalNDVI += utils.ConvertToFloat(tree.NDVI)
				count++
			}

			mostFreqClass := getMostFrequentClass(classFrequency)
			if count > 0 {
				promedios = append(promedios, Promedio{
					ZoneID:        zone.ID,
					MostFreqClass: mostFreqClass,
					AvgNDVI:       totalNDVI / float64(count),
				})
			}
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(promedios)
}

// GetZoneStatus returns the most frequent class and average NDVI for all trees in a zone
func GetZoneStatus(w http.ResponseWriter, r *http.Request) {
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

	type Promedio struct {
		ZoneID        string  `json:"zone_id"`
		MostFreqClass int     `json:"most_freq_class"`
		AvgNDVI       float64 `json:"avg_ndvi"`
	}

	var promedios []Promedio

	for _, forest := range forests {
		for _, zone := range forest.Zones {
			if zone.ID == zoneID {
				classFrequency := make(map[int]int)
				var totalNDVI float64
				var count int

				for _, tree := range zone.Trees {
					classValue := utils.ConvertToInt(tree.Class)
					if classValue != 0 { // Ignore class 0
						classFrequency[classValue]++
					}
					totalNDVI += utils.ConvertToFloat(tree.NDVI)
					count++
				}

				mostFreqClass := getMostFrequentClass(classFrequency)
				if count > 0 {
					promedios = append(promedios, Promedio{
						ZoneID:        zoneID,
						MostFreqClass: mostFreqClass,
						AvgNDVI:       totalNDVI / float64(count),
					})
				}
			}
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(promedios)

}

// getMostFrequentClass returns the most frequent class value
func getMostFrequentClass(freqMap map[int]int) int {
	mostFrequent := 0
	maxCount := 0

	// Find most frequent class
	for class, count := range freqMap {
		if count > maxCount {
			mostFrequent = class
			maxCount = count
		}
	}

	return mostFrequent
}
