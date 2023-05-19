package server

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func EnrichLogger(logger *zap.Logger, c *gin.Context) *zap.Logger {
	return logger.With()
}
