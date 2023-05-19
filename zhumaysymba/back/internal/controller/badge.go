package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/service"
	"go.uber.org/zap"
	"net/http"
	"strconv"
)

type BadgeController struct {
	logger  *zap.Logger
	service service.BadgeCRUD
}

func NewBadgeController(logger *zap.Logger, service service.BadgeCRUD) BadgeController {
	return BadgeController{
		logger:  logger,
		service: service,
	}
}

func (a BadgeController) CreateBadge(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)

	var payload entity.Badge
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	_, err := a.service.Create(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a BadgeController) RetrieveBadge(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	badgeID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.Retrieve(uint(badgeID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}

func (a BadgeController) UpdateBadge(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	badgeID, _ := strconv.Atoi(c.Params.ByName("id"))

	var payload entity.Badge
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	payload.ID = uint(badgeID)
	err := a.service.Update(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a BadgeController) DeleteBadge(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	badgeID, _ := strconv.Atoi(c.Params.ByName("id"))

	err := a.service.Delete(uint(badgeID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a BadgeController) GetBadges(c *gin.Context) {
	log := server.EnrichLogger(a.logger, c)

	badges, err := a.service.Get(processing.GetOptions(c))
	if err != nil {
		log.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	c.JSON(http.StatusOK, badges)
}
