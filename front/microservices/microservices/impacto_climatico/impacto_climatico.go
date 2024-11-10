package impacto_climatico

import (
	"context"
	"encoding/json"
	"forest-map/microservices/db_config"
	"forest-map/microservices/interfaces"
	"forest-map/microservices/utils"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

type ClimateImpact struct {
	ForestName        string          `json:"forest_name"`
	ClassDistribution map[int]float64 `json:"class_distribution"`
	AvgNDVI           float64         `json:"avg_ndvi"`
	AvgHeight         float64         `json:"avg_height"`
	MostFrequentClass int             `json:"most_frequent_class"`
	ImpactScore       float64         `json:"impact_score"`
	Details           string          `json:"details"`
}

// GetImpactoCambioClimatico provides a simulated impact analysis for all forests
func GetImpactoCambioClimatico(w http.ResponseWriter, r *http.Request) {
	ctx := context.TODO()
	client := db_config.GetMongoClient()
	db := client.Database("forest-data")

	collections, err := db.ListCollectionNames(ctx, bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var totalTrees int
	var totalHeight float64
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

		err = cursor.All(ctx, &forests)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		for _, forest := range forests {
			for _, zone := range forest.Zones {
				for _, tree := range zone.Trees {
					totalTrees++
					totalHeight += utils.ConvertToFloat(tree.Height)
					totalNDVI += utils.ConvertToFloat(tree.NDVI)
					class := utils.ConvertToInt(tree.Class)
					classFrequency[class]++
				}
			}
		}
	}

	avgHeight := totalHeight / float64(totalTrees)
	avgNDVI := totalNDVI / float64(totalTrees)
	mostFrequentClass := utils.GetMostFrequentClass(classFrequency)
	impactScore := avgHeight + avgNDVI

	climateImpact := ClimateImpact{
		ForestName:        "All Forests",
		ClassDistribution: make(map[int]float64),
		AvgNDVI:           avgNDVI,
		AvgHeight:         avgHeight,
		MostFrequentClass: mostFrequentClass,
		ImpactScore:       impactScore,
		Details:           "This is a simulated impact score based on average height and NDVI values",
	}

	for class, count := range classFrequency {
		climateImpact.ClassDistribution[class] = float64(count) / float64(totalTrees)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(climateImpact)
}
