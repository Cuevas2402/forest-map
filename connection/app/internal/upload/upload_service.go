package upload

import (
	"context"
	"fmt"
	"io"
	"time"
)

func (c *ClientUploader) UploadFile(file io.Reader, object string) error {
	ctx := context.Background()

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	wc := c.Cl.Bucket(c.BucketName).Object(c.UploadPath + object).NewWriter(ctx)
	if _, err := io.Copy(wc, file); err != nil {
		return fmt.Errorf("io.Copy: %v", err)
	}
	if err := wc.Close(); err != nil {
		return fmt.Errorf("Writer.Close: %v", err)
	}

	return nil
}
