package rest

import (
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
	"server/logger"
	"server/scan"
)

type Server struct {
	router *gin.Engine
}

func Start(port string) {
	logger.Log.Info("Creating new REST HTTP server")
	router := gin.Default()
	server := &Server{router: router}
	server.setupRoutes()
	logger.Log.Info("Starting REST HTTP server", "port", port)
	err := server.router.Run("localhost:" + port)
	if err != nil {
		logger.Log.Error("Error starting server", "error", err)
	}
}

func (server *Server) setupRoutes() {
	logger.Log.Info("Setting up routes")
	api := server.router.Group("/api")
	{
		api.POST("/scan/:scanType", server.handler)
	}
}

func (server *Server) handler(c *gin.Context) {
	fileContent, err := extractFileContent(c)
	if err != nil {
		logger.Log.Error("Error extracting file content", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	occurrences, err := scan.Handle(c.Param("scanType"), fileContent)
	if err != nil {
		logger.Log.Error("Error scanning file content", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, occurrences)
}

func extractFileContent(c *gin.Context) ([]byte, error) {
	form, err := c.MultipartForm()
	if err != nil {
		logger.Log.Error("Error extracting form", "error", err)
		return []byte{}, err
	}
	var firstKey string
	for key := range form.File {
		firstKey = key
		break
	}
	fileHeader := form.File[firstKey]
	file, err := fileHeader[0].Open()
	if err != nil {
		logger.Log.Error("Error opening file", "error", err)
		return []byte{}, err
	}
	content, err := io.ReadAll(file)
	if err != nil {
		logger.Log.Error("Error reading file", "error", err)
		return []byte{}, err
	}
	return content, nil
}
