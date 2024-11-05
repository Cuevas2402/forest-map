package models

import (
	"errors"
	"log"

	"example.com/connection/db"
	"example.com/connection/utils"
)

type Users struct {
	Users []User
}

type User struct {
	Uid       int64  `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type Auth struct {
	Token string
}

func (u *User) Save() error {
	query := `INSERT INTO users (firstName, lastName, email, password) VALUES ($1,$2,$3,$4)`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	hpassword, err := utils.HashPassword(u.Password)

	if err != nil {
		return err
	}

	_, err = stmt.Exec(u.FirstName, u.LastName, u.Email, hpassword)
	return err

}

func (u *User) Validate() error {

	query := `
		SELECT * FROM users WHERE email = $1;
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return nil
	}

	row := stmt.QueryRow(u.Email)

	var password string

	err = row.Scan(&u.Uid, &u.FirstName, &u.LastName, &u.Email, &password)

	log.Print(u)

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

	rows, err := db.Postgre.Query(query)

	if err != nil {
		return users, nil
	}

	defer rows.Close()

	for rows.Next() {

		var user User
		err = rows.Scan(&user.Uid, &user.FirstName, &user.LastName, &user.Email, &user.Password)
		if err != nil {
			return users, err
		}

		users = append(users, user)

	}

	return users, nil

}
