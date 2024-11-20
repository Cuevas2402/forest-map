package zone

import (
	"example.com/connection/app/pkg/db"
)

func (zone *Zone) Save() error {

	query := `
		INSERT INTO zone (fid, name, location) VALUES ($1, $2, $3);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(&zone.Fid, &zone.Name, &zone.Location)

	if err != nil {
		return err
	}

	return nil
}

func (zone *Zone) Get() error {
	query := `
		SELECT fid, name, location FROM zone WHERE zid = $1;
	`
	row := db.Postgre.QueryRow(query)

	err := row.Scan(&zone.Fid, &zone.Name, &zone.Location)

	return err
}
