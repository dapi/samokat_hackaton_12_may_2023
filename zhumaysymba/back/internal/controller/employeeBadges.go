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

type EmployeeBadgesController struct {
	logger  *zap.Logger
	service service.EmployeeBadgesCRUD
}

func NewEmployeeBadgesController(logger *zap.Logger, service service.EmployeeBadgesCRUD) EmployeeBadgesController {
	return EmployeeBadgesController{
		logger:  logger,
		service: service,
	}
}

// Тут мы ожидаем в теле запроса issuerId(кто присвоил), badgeId и employeeId(кому)
func (a EmployeeBadgesController) AssignEmployeeBadge(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	employeeID, _ := strconv.Atoi(c.Params.ByName("id"))

	var payload entity.EmployeeBadges
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	payload.EmployeeID = uint(employeeID)
	_, err := a.service.AssignBadge(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a EmployeeBadgesController) RetrieveEmployeeBadges(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	employeeID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.RetrieveEmployeeBadges(uint(employeeID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}
