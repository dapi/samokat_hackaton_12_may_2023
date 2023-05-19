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

type UnitTypeController struct {
	logger  *zap.Logger
	service service.UnitTypeCRUD
}

func NewUnitTypeController(logger *zap.Logger, service service.UnitTypeCRUD) UnitTypeController {
	return UnitTypeController{
		logger:  logger,
		service: service,
	}
}

func (a UnitTypeController) CreateUnitType(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)

	var payload entity.UnitType
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

func (a UnitTypeController) RetrieveUnitType(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	unitTypeID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.Retrieve(uint(unitTypeID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}

func (a UnitTypeController) UpdateUnitType(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	unitTypeID, _ := strconv.Atoi(c.Params.ByName("id"))

	var payload entity.UnitType
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	payload.ID = uint(unitTypeID)
	err := a.service.Update(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a UnitTypeController) DeleteUnitType(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	unitTypeID, _ := strconv.Atoi(c.Params.ByName("id"))

	err := a.service.Delete(uint(unitTypeID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a UnitTypeController) GetUnitTypes(c *gin.Context) {
	log := server.EnrichLogger(a.logger, c)

	unitTypes, err := a.service.Get(processing.GetOptions(c))
	if err != nil {
		log.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	c.JSON(http.StatusOK, unitTypes)
}
