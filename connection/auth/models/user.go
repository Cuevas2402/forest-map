package models

import (
	"errors"

	"example.com/auth/db"
	"example.com/auth/utils"
)

type User struct {
	Uid      int64
	Email    string
	Password string
}

func (u *User) Validate() error {

	query := `
		SELECT uid, email, password FROM users WHERE email = ?;
	`

	stmt, err := db.DB.Prepare(query)

	defer stmt.Close()

	if err != nil {
		return nil
	}

	row := stmt.QueryRow(u.Email)

	var password string

	err = row.Scan(&password)

	if err != nil {
		return err
	}

	validated := utils.CheckPassword(u.Password, password)

	if !validated {
		return errors.New("error in credentials")
	}

	return nil

}

func (u *User) IsAdmin() error {
	query := `
		SELECT email FROM users WHERE email = ?;
	`

	stmt, err := db.DB.Prepare(query)

	defer stmt.Close()

	if err != nil {
		return err
	}

	row := stmt.QueryRow(u.Email)

	var email string

	err = row.Scan(&email)

	if err != nil {
		return err
	}

	return nil
}
