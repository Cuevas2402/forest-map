package models

import "example.com/connection/db"

type Analysis struct {
	Aid  int64
	Zid  int64
	Date int64
}

func (a *Analysis) Save() error {
	query := `
		INSERT INTO analysis (zid, date) VALUES ($1, $2);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.Zid, a.Date)

	return err
}
