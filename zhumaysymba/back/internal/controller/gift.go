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

type GiftController struct {
	logger  *zap.Logger
	service service.GiftCRUD
}

func NewGiftController(logger *zap.Logger, service service.GiftCRUD) GiftController {
	return GiftController{
		logger:  logger,
		service: service,
	}
}

func (a GiftController) CreateGift(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)

	var payload entity.Gift
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

func (a GiftController) RetrieveGift(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	giftID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.Retrieve(uint(giftID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}

func (a GiftController) UpdateGift(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	giftID, _ := strconv.Atoi(c.Params.ByName("id"))

	var payload entity.Gift
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	payload.ID = uint(giftID)
	err := a.service.Update(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a GiftController) DeleteGift(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	giftID, _ := strconv.Atoi(c.Params.ByName("id"))

	err := a.service.Delete(uint(giftID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a GiftController) GetGifts(c *gin.Context) {
	log := server.EnrichLogger(a.logger, c)

	gifts, err := a.service.Get(processing.GetOptions(c))
	if err != nil {
		log.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	c.JSON(http.StatusOK, gifts)
}
