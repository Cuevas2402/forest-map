package models

import (
	"errors"

	"example.com/connection/db"
	"example.com/connection/utils"
)

type Users struct {
	Users []User
}

type User struct {
	Id        int64
	FirstName string
	LastName  string
	Email     string
	Password  string
	Role      string
}

func (u *User) Save() error {

	query := `INSERT INTO users (firstName, lastName, email, password, role) VALUES (?,?,?,?,?)`

	stmt, err := db.DB.Prepare(query)

	defer stmt.Close()

	if err != nil {
		return nil
	}

	hpassword, err := utils.HashPassword(u.Password)

	if err != nil {
		return nil
	}

	_, err = stmt.Exec(u.FirstName, u.LastName, u.Email, hpassword, u.Role)

	return err

}

func (u *User) Validate() error {

	query := `
		SELECT password FROM users WHERE email = ?;
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

func GetUsers() ([]User, error) {

	query := `
		SELECT * FROM users;
	`

	var users []User

	rows, err := db.DB.Query(query)

	defer rows.Close()

	if err != nil {
		return users, nil
	}

	for rows.Next() {

		var user User
		err = rows.Scan(&user.Id, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Role)
		if err != nil {
			return users, err
		}

		users = append(users, user)

	}

	return users, nil

}
