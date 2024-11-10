package main

import (
	"forest-map/Microservices/resumen_datos"
	"forest-map/microservices/datos"
	"forest-map/microservices/db_config"
	"forest-map/microservices/estado_forestal"
	"forest-map/microservices/impacto_climatico"
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

	// Impacto climático service
	go func() {
		rImpactoClimatico := mux.NewRouter()
		rImpactoClimatico.HandleFunc("/api/reportes/impacto-cambio-climatico", impacto_climatico.GetImpactoCambioClimatico).Methods("GET")

		log.Println("Starting Impacto Climatico service on port 5004")
		log.Fatal(http.ListenAndServe(":5004", rImpactoClimatico))
	}()

	// Resumen Datos service
	go func() {
		rResumenDatos := mux.NewRouter()
		rResumenDatos.HandleFunc("/api/reportes/resumen-datos", resumen_datos.GetResumenDatos).Methods("GET")
		rResumenDatos.HandleFunc("/api/reportes/resumen-datos/{forest}/zonas", resumen_datos.GetResumenDatosForestal).Methods("GET")
		rResumenDatos.HandleFunc("/api/reportes/resumen-datos/{forest}/zonas/{zone}/resumen", resumen_datos.GetResumenDatosZona).Methods("GET")

		log.Println("Starting Resumen Datos service on port 5005")
		log.Fatal(http.ListenAndServe(":5005", rResumenDatos))
	}()

	// Wait indefinitely
	select {}
}
