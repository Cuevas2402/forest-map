package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {

	var err error

	DB, err = sql.Open("sqlite3", "./db/api.db")

	if err != nil {
		panic("Could not connect to db")
	}

	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(5)

	createTables()

}

func createTables() {

	users := `
		CREATE TABLE IF NOT EXISTS users (
			uid INTEGER PRIMARY KEY AUTOINCREMENT,
			firstName TEXT NOT NULL,
			lastName TEXT NOT NULL,
			email TEXT NOT NULL,
			password TEXT NOT NULL,
			role TEXT NOT NULL
		)
	`

	_, err := DB.Exec(users)

	if err != nil {
		panic("Could not create table users")
	}

}
