package models

import "example.com/connection/db"

type Action struct {
	Aid         int64
	Uid         int64
	Date        string
	Description string
}

func (a *Action) Save() error {
	query := `
		INSERT INTO actions (uid, date, description) VALUES ($1, $2, $3);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.Uid, a.Date, a.Description)

	return err

}
