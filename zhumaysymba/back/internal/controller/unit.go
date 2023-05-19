package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/service"
	"go.uber.org/zap"
	"net/http"
	"strconv"
)

type UnitController struct {
	logger  *zap.Logger
	service service.UnitCRUD
}

func NewUnitController(logger *zap.Logger, service service.UnitCRUD) UnitController {
	return UnitController{
		logger:  logger,
		service: service,
	}
}

func (a UnitController) CreateUnit(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)

	var payload entity.Unit
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	fmt.Println(payload)

	_, err := a.service.Create(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a UnitController) RetrieveUnit(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	unitID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.Retrieve(uint(unitID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}

func (a UnitController) UpdateUnit(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	unitID, _ := strconv.Atoi(c.Params.ByName("id"))

	var payload entity.Unit
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	payload.ID = uint(unitID)
	err := a.service.Update(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a UnitController) DeleteUnit(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	unitID, _ := strconv.Atoi(c.Params.ByName("id"))

	err := a.service.Delete(uint(unitID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a UnitController) GetUnits(c *gin.Context) {
	log := server.EnrichLogger(a.logger, c)

	units, err := a.service.Get(processing.GetOptions(c))
	if err != nil {
		log.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	c.JSON(http.StatusOK, units)
}
