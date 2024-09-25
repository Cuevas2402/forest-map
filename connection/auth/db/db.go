package db

import (
	"database/sql"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {

	connStr := "host=localhost port=5432 user=juancuevas dbname=forestmap sslmode=disable"

	DB, err := sql.Open("postgres", connStr)

	if err != nil {
		panic("Could not connect to db")
	}

	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(5)

}
