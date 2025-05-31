package rest

import (
	"github.com/gin-gonic/gin"
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
		api.POST("/scan/:scan_type", server.getItemsHandler)
	}
}

func (server *Server) getItemsHandler(c *gin.Context) {
	logger.Log.Info("Getting items", "count", len(scan.Items))
	c.JSON(200, gin.H{
		"items": scan.Items,
		"total": len(scan.Items),
	})
}
