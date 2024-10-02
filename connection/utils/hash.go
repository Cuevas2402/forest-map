package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(s string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(s), 14)
	return string(hashed), err
}

func CheckPassword(s1 string, s2 string) bool {

	err := bcrypt.CompareHashAndPassword([]byte(s2), []byte(s1))

	return err == nil

}
