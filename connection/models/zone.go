package models

import "example.com/connection/db"

type Zone struct {
	Zid      int64
	Fid      int64
	Name     string
	Location string
}

func (z *Zone) Save() error {
	query := `
		INSERT INTO zones (fid, name, location) VALUES ($1, $2, $3);	
	`
	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(z.Fid, z.Name, z.Location)

	return err

}
