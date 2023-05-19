package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server"
	"github.com/somnoynadno/zhumaysynba/internal/service"
	"go.uber.org/zap"
	"net/http"
	"strconv"
)

type EmployeeGiftsController struct {
	logger  *zap.Logger
	service service.EmployeeGiftsService
}

func NewEmployeeGiftsController(logger *zap.Logger, service service.EmployeeGiftsService) EmployeeGiftsController {
	return EmployeeGiftsController{
		logger:  logger,
		service: service,
	}
}

func (a EmployeeGiftsController) BuyGift(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)

	var payload entity.EmployeeGifts
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	_, err := a.service.BuyGift(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a EmployeeGiftsController) RetrieveEmployeeGifts(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	employeeID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.RetrieveEmployeeBoughtGifts(uint(employeeID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}
