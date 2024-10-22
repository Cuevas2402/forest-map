package db

import (
	"context"
	"database/sql"
	"fmt"
	"net"
	"os"

	"cloud.google.com/go/cloudsqlconn"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
)

var Postgre *sql.DB

func InitPg() {

	user := os.Getenv("DB_USER")
	dbname := os.Getenv("DB_NAME")
	password := os.Getenv("DB_PASSWORD")
	instanceConnectionName := os.Getenv("INSTANCE_CONNECTION_NAME")

	if user == "" || dbname == "" || instanceConnectionName == "" || password == "" {
		panic("Could not get variables")
	}

	dsn := fmt.Sprintf("user=%s password=%s database=%s", user, password, dbname)
	config, err := pgx.ParseConfig(dsn)

	if err != nil {
		panic(err.Error())
	}

	d, err := cloudsqlconn.NewDialer(context.Background())
	if err != nil {
		panic(err.Error())
	}

	config.DialFunc = func(ctx context.Context, network, addr string) (net.Conn, error) {
		return d.Dial(ctx, instanceConnectionName)
	}

	dbUri := stdlib.RegisterConnConfig(config)
	dbPool, err := sql.Open("pgx", dbUri)

	if err != nil {
		panic(err.Error())
	}

	Postgre = dbPool

}
