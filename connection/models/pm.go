package models

import "example.com/connection/db"

type PreferenceMapping struct {
	Pmid int64
	Pid  int64
	Uid  int64
}

func (pm *PreferenceMapping) Save() error {
	query := `
		INSERT INTO preferencesmapping (pid, uid) VALUES ($1, $2);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(pm.Pid, pm.Uid)

	return err
}
