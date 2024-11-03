package models

import "example.com/connection/db"

type Access struct {
	Acid   int64
	Uid    int64
	Sid    int64
	Date   string
	Status string
}

func (a *Access) Save() error {
	query := `
		INSERT INTO access (uid, sid, date, status)	 VALUES ($1, $2, $3, $4);
	`
	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.Uid, a.Sid, a.Date, a.Status)

	return err
}
