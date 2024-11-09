package main

import (
	"forest-map/microservices/datos"
	"forest-map/microservices/db_config"
	"forest-map/microservices/estado_forestal"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	db_config.Connect()

	// Using go func() to run the services in parallel
	// Datos service
	go func() {
		rDatos := mux.NewRouter()
		rDatos.HandleFunc("/api/bosques", datos.GetAllForests).Methods("GET")
		rDatos.HandleFunc("/api/{forest}/zonas", datos.GetZonesByForest).Methods("GET")
		rDatos.HandleFunc("/api/{forest}/zonas/{zone}/trees", datos.GetTreesByZone).Methods("GET")

		log.Println("Starting Datos service on port 5000")
		log.Fatal(http.ListenAndServe(":5000", rDatos))
	}()

	// Estado forestal service
	go func() {
		rEstadoForestal := mux.NewRouter()
		rEstadoForestal.HandleFunc("/api/reportes/estado-forestal", estado_forestal.GetForestStatus).Methods("GET")
		rEstadoForestal.HandleFunc("/api/reportes/estado-forestal/{forest}/zonas", estado_forestal.GetForestZoneStatus).Methods("GET")
		rEstadoForestal.HandleFunc("/api/reportes/estado-forestal/{forest}/zonas/{zone}/status", estado_forestal.GetZoneStatus).Methods("GET")

		log.Println("Starting Estado Forestal service on port 5001")
		log.Fatal(http.ListenAndServe(":5001", rEstadoForestal))
	}()

	// Wait indefinitely
	select {}
}
