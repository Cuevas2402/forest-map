package datos

import (
	"context"
	"encoding/json"
	"fmt"
	"forest-map/microservices/db_config"
	"forest-map/microservices/interfaces"
	"forest-map/microservices/utils"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

// GetAllForests retrieves all forests from all collections
func GetAllForests(w http.ResponseWriter, r *http.Request) {
	ctx := context.TODO()
	client := db_config.GetMongoClient()
	db := client.Database("forest-data")

	collections, err := db.ListCollectionNames(ctx, bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var allForests []interfaces.Forest

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

		for i, forest := range forests {
			for j, zone := range forest.Zones {
				for k, tree := range zone.Trees {
					// Convert ImageID, XMin, XMax, YMin, YMax, Height, Class, NDVI to appropriate types
					forests[i].Zones[j].Trees[k].ImageID = utils.ConvertToInt(tree.ImageID)
					forests[i].Zones[j].Trees[k].XMin = utils.ConvertToInt(tree.XMin)
					forests[i].Zones[j].Trees[k].XMax = utils.ConvertToInt(tree.XMax)
					forests[i].Zones[j].Trees[k].YMin = utils.ConvertToInt(tree.YMin)
					forests[i].Zones[j].Trees[k].YMax = utils.ConvertToInt(tree.YMax)
					forests[i].Zones[j].Trees[k].Height = utils.ConvertToFloat(tree.Height)
					forests[i].Zones[j].Trees[k].Class = utils.ConvertToInt(tree.Class)
					forests[i].Zones[j].Trees[k].NDVI = utils.ConvertToFloat(tree.NDVI)
				}
			}
		}

		allForests = append(allForests, forests...)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(allForests)
}

// GetZonesByForest retrieves all zones within a specific forest
func GetZonesByForest(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	forestName := params["forest"]

	fmt.Printf("Recibido forestName: %s\n", forestName)

	// Conectar a la colección correspondiente al nombre del bosque (forestName)
	collection := db_config.GetCollection(forestName)
	ctx := context.TODO()

	fmt.Printf("Consultando la colección: %s\n", forestName)

	var forest []interfaces.Forest
	filter := bson.M{}
	fmt.Printf("Usando filtro: %v\n", filter)

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		fmt.Printf("Error al consultar la colección %s: %v\n", forestName, err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	err = cursor.All(ctx, &forest)
	if err != nil {
		fmt.Printf("Error al decodificar documentos de la colección %s: %v\n", forestName, err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(forest) == 0 {
		fmt.Printf("No se encontraron documentos en la colección: %s\n", forestName)
		http.Error(w, "No se encontraron documentos", http.StatusNotFound)
		return
	}

	fmt.Printf("Documentos encontrados en la colección %s: %d\n", forestName, len(forest))

	var zones []interfaces.Zone
	for _, f := range forest {
		for _, zone := range f.Zones {
			for _, tree := range zone.Trees {
				tree.ImageID = utils.ConvertToInt(tree.ImageID)
				tree.XMin = utils.ConvertToInt(tree.XMin)
				tree.XMax = utils.ConvertToInt(tree.XMax)
				tree.YMin = utils.ConvertToInt(tree.YMin)
				tree.YMax = utils.ConvertToInt(tree.YMax)
				tree.Height = utils.ConvertToFloat(tree.Height)
				tree.Class = utils.ConvertToInt(tree.Class)
				tree.NDVI = utils.ConvertToFloat(tree.NDVI)
			}
			zones = append(zones, zone)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(zones)
}

// GetTreesByZone retrieves all trees within a specific zone of a specific forest
func GetTreesByZone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	forestName := params["forest"]
	zoneID := params["zone"]

	fmt.Printf("Recibido forestName: %s y zoneID: %s\n", forestName, zoneID)

	// Conectar a la colección correspondiente al nombre del bosque (forestName)
	collection := db_config.GetCollection(forestName)
	ctx := context.TODO()

	fmt.Printf("Consultando la colección: %s\n", forestName)

	var forests []interfaces.Forest
	filter := bson.M{}
	fmt.Printf("Usando filtro: %v\n", filter)

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		fmt.Printf("Error al consultar la colección %s: %v\n", forestName, err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	err = cursor.All(ctx, &forests)
	if err != nil {
		fmt.Printf("Error al decodificar documentos de la colección %s: %v\n", forestName, err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(forests) == 0 {
		fmt.Printf("No se encontraron documentos en la colección: %s\n", forestName)
		http.Error(w, "No se encontraron documentos", http.StatusNotFound)
		return
	}

	fmt.Printf("Documentos encontrados en la colección %s: %d\n", forestName, len(forests))

	var trees []interfaces.Tree
	for _, forest := range forests {
		for _, zone := range forest.Zones {
			if zone.ID == zoneID {
				for _, tree := range zone.Trees {
					tree.ImageID = utils.ConvertToInt(tree.ImageID)
					tree.XMin = utils.ConvertToInt(tree.XMin)
					tree.XMax = utils.ConvertToInt(tree.XMax)
					tree.YMin = utils.ConvertToInt(tree.YMin)
					tree.YMax = utils.ConvertToInt(tree.YMax)
					tree.Height = utils.ConvertToFloat(tree.Height)
					tree.Class = utils.ConvertToInt(tree.Class)
					tree.NDVI = utils.ConvertToFloat(tree.NDVI)
					trees = append(trees, tree)
				}
			}
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(trees)
}
