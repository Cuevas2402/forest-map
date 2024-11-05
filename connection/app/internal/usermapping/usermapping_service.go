package usermapping

import (
	"errors"

	"example.com/connection/app/pkg/db"
)

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

func (um *UserMapping) Find() error {

	query := `
		SELECT uimid, cid, rid FROM usermapping WHERE status = 'active' AND uid = $1;
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	row := stmt.QueryRow(um.Uid)

	if row == nil {
		return errors.New("no matching data")
	}

	err = row.Scan(&um.Uimid, &um.Cid, &um.Rid)

	return err

}
