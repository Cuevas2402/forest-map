package models

import "example.com/connection/db"

type Role struct {
	Rid         int64
	Description string
}

func (r *Role) Save() error {

	query := `
		INSERT INTO roles (description) VALUES ($1);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(r.Description)

	return err

}
