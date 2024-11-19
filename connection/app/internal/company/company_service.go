package company

import (
	"time"

	"example.com/connection/app/pkg/db"
)

func (c *Company) Save() error {

	query := `
		INSERT INTO companies (name, date) VALUES ($1, $2);
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	c.Date = time.Now().String()[0:10]

	_, err = stmt.Exec(c.Name, c.Date)

	if err != nil {
		return err
	}

	return nil

}

func (c *Company) Delete() error {
	query := `
		DELETE FROM companies WHERE cid = $1
	`
	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(&c.Cid)

	return err
}

func (c *Company) Update() error {
	query := `
		UPDATE companies SET name = $1;
	`

	stmt, err := db.Postgre.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(&c.Name)

	return err

}

func getCompanies() ([]Company, error) {
	query := `
		SELECT * FROM companies;
	`

	var companies []Company

	rows, err := db.Postgre.Query(query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {

		var company Company

		err = rows.Scan(&company.Cid, &company.Name, &company.Date)

		if err != nil {
			return nil, err
		}

		companies = append(companies, company)

	}

	return companies, nil

}
