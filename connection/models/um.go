package models

import "example.com/connection/db"

type UserMapping struct {
	Uimid  int64
	Uid    int64
	Cid    int64
	Rid    int64
	Date   string
	Status string
}

func (um *UserMapping) Save() error {

	query := `
		INSERT INTO usermapping (uid, cid, rid, date, status) VALUES ($1, $2, $3, $4, $5);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(um.Uid, um.Cid, um.Rid, um.Date, um.Status)

	if err != nil {
		return err
	}

	return nil
}
