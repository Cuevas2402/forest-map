package user

import (
	"errors"

	"example.com/connection/app/pkg/db"
	"example.com/connection/app/pkg/utils"
)

func (u *User) Get() error {

	query := `
		SELECT firstname, lastname, email FROM users WHERE uid = $1;
	`
	row := db.Postgre.QueryRow(query, u.Uid)

	if row == nil {
		return errors.New("no matching data")
	}

	err := row.Scan(&u.FirstName, &u.LastName, &u.Email)

	return err

}

func (u *User) Save() (int64, error) {
	query := `INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING uid`

	stmt, err := db.Postgre.Prepare(query)
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	hpassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return 0, err
	}

	var userID int64

	err = stmt.QueryRow(u.FirstName, u.LastName, u.Email, hpassword).Scan(&userID)
	if err != nil {
		return 0, err
	}

	return userID, nil
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

	if err != nil {
		return err
	}

	validated := utils.CheckPassword(u.Password, password)

	if !validated {
		return errors.New("error in credentials")
	}

	return nil

}

func (u *User) Update() error {

	query := `
		UPDATE users SET firstname = $1, lastname = $2, email = $3 WHERE uid = $4
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {

		return err

	}

	defer stmt.Close()

	_, err = stmt.Exec(u.FirstName, u.LastName, u.Email, u.Uid)

	return err

}

func (u *User) Delete() error {

	query := `
		DELETE FROM users WHERE uid = $1
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(u.Uid)

	return err

}

func (u *User) UpdatePassword() error {

	var err error

	query := `
		UPDATE users SET password = $1 WHERE uid = $2
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	u.Password, err = utils.HashPassword(u.Password)

	if err != nil {
		return err
	}

	_, err = stmt.Exec(u.Password, u.Uid)

	return err
}

func GetAllUsers() ([]User, error) {

	query := `
		SELECT uid, firstname, lastname, email FROM users;
	`

	var users []User

	rows, err := db.Postgre.Query(query)

	if err != nil {
		return users, nil
	}

	defer rows.Close()

	for rows.Next() {

		var user User
		err = rows.Scan(&user.Uid, &user.FirstName, &user.LastName, &user.Email)
		if err != nil {
			return users, err
		}

		users = append(users, user)

	}

	return users, nil

}
