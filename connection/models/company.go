package models

import (
	"time"

	"example.com/connection/db"
)

type Company struct {
	Cid  int64
	Name string
	Date string
}

func (c *Company) Save() error {

	query := `
		INSERT INTO companies (name, date) VALUES ($1, $2);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	c.Date = time.Now().String()[0:10]

	_, err = stmt.Exec(c.Name, c.Date)

	if err != nil {
		return err
	}

	return nil

}
