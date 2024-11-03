package models

import "example.com/connection/db"

type Forest struct {
	Fid      int64
	Name     string
	Location string
}

func (f *Forest) Save() error {
	query := `
		INSERT INTO forest (name, location) VALUES ($1, $2)
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(f.Name, f.Location)

	return err
}
