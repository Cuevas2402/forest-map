package models

import "example.com/connection/db"

type Preference struct {
	Pid          int64
	Descripction string
}

func (p *Preference) Save() error {
	query := `
		INSERT INTO preferences (descripction) VALUES ($1);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(p.Descripction)

	return err
}
