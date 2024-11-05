package upload

import "cloud.google.com/go/storage"

type ClientUploader struct {
	Cl         *storage.Client
	ProjectID  string
	BucketName string
	UploadPath string
}

type Tree struct {
	Name string
}
