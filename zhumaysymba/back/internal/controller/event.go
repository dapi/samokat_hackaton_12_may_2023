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

type EventController struct {
	logger  *zap.Logger
	service service.EventCRUD
}

func NewEventController(logger *zap.Logger, service service.EventCRUD) EventController {
	return EventController{
		logger:  logger,
		service: service,
	}
}

func (a EventController) CreateEvent(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)

	var payload entity.Event
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

func (a EventController) RetrieveEvent(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	eventID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.Retrieve(uint(eventID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}

func (a EventController) UpdateEvent(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	eventID, _ := strconv.Atoi(c.Params.ByName("id"))

	var payload entity.Event
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	payload.ID = uint(eventID)
	err := a.service.Update(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a EventController) DeleteEvent(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	eventID, _ := strconv.Atoi(c.Params.ByName("id"))

	err := a.service.Delete(uint(eventID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a EventController) GetEvents(c *gin.Context) {
	log := server.EnrichLogger(a.logger, c)

	events, err := a.service.Get(processing.GetOptions(c))
	if err != nil {
		log.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	c.JSON(http.StatusOK, events)
}
