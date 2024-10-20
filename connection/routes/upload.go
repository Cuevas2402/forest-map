package routes

import (
	"archive/zip"
	"bytes"
	"context"
	"encoding/csv"
	"io"
	"log"
	"net/http"

	"cloud.google.com/go/storage"
	"example.com/connection/db"
	"example.com/connection/models"
	"github.com/gin-gonic/gin"
)

func uploadCsv(c *gin.Context) {

	headersList := [19]string{"id_tree", "species", "xmin", "xmax", "ymin", "ymax", "tree_height", "id_crownMix", "class", "id_imagen", "image_path", "image_date", "image_description", "id_zone", "ndvi_value", "coordenate", "tree_quantity", "id_areaForestal", "id_arbol"}

	formFile, err := c.FormFile("file")

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse file"})
		return
	}

	file, err := formFile.Open()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Could not open file"})
		return
	}

	defer file.Close()

	reader := csv.NewReader(file)
	reader.Comma = ','

	headers, err := reader.Read()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error reading file"})
		return
	}

	if len(headers) < len(headersList) {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "invalid csv form"})
		return
	}

	for i := range headersList {

		if headers[i] != headersList[i] {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "invalid csv form"})
			return
		}

	}

	coll := db.Mongo.Database("forest-data").Collection("companies")

	trees := []interface{}{
		models.Tree{Name: "tree1"},
		models.Tree{Name: "tree2"},
	}

	_, err = coll.InsertMany(context.TODO(), trees)

	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"message": "could not save data in db"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "data saved"})
}

func uploadImg(c *gin.Context) {

	var uploader *models.ClientUploader

	client, err := storage.NewClient(context.Background())

	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	uploader = &models.ClientUploader{
		Cl:         client,
		BucketName: "forestdata_bucket",
		ProjectID:  "forestmap-438420",
		UploadPath: "test-files/",
	}

	f, err := c.FormFile("file")

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	file, err := f.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer file.Close()

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fileReader := bytes.NewReader(fileBytes)

	imgs, err := zip.NewReader(fileReader, f.Size)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	for _, zipFile := range imgs.File {

		fileInZip, err := zipFile.Open()

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer fileInZip.Close()

		err = uploader.UploadFile(fileInZip, zipFile.Name)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

	}

	c.JSON(http.StatusOK, gin.H{"message": "success"})

}
