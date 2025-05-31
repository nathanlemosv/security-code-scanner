package rest

import (
	"github.com/gin-gonic/gin"
	"server/logger"
)

type Server struct {
	router *gin.Engine
}

type Item struct {
	ID     string  `json:"id"`
	Name   string  `json:"name"`
	Price  float64 `json:"price"`
	Status bool    `json:"status"`
}

var Items = []Item{
	{ID: "1", Name: "Item 1", Price: 19.99, Status: true},
	{ID: "2", Name: "Item 2", Price: 29.99, Status: false},
	{ID: "3", Name: "Item 3", Price: 39.99, Status: true},
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
	logger.Log.Info("Getting items", "count", len(Items))
	c.JSON(200, gin.H{
		"items": Items,
		"total": len(Items),
	})
}
