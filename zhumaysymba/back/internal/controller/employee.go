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

type EmployeeController struct {
	logger  *zap.Logger
	service service.EmployeeCRUD
}

func NewEmployeeController(logger *zap.Logger, service service.EmployeeCRUD) EmployeeController {
	return EmployeeController{
		logger:  logger,
		service: service,
	}
}

func (a EmployeeController) CreateEmployee(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)

	var payload entity.Employee
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

func (a EmployeeController) RetrieveEmployee(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	employeeID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.Retrieve(uint(employeeID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}

func (a EmployeeController) UpdateEmployee(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	employeeID, _ := strconv.Atoi(c.Params.ByName("id"))

	var payload entity.Employee
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	payload.ID = uint(employeeID)
	err := a.service.Update(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a EmployeeController) DeleteEmployee(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	employeeID, _ := strconv.Atoi(c.Params.ByName("id"))

	err := a.service.Delete(uint(employeeID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a EmployeeController) GetEmployees(c *gin.Context) {
	log := server.EnrichLogger(a.logger, c)

	employees, err := a.service.Get(processing.GetOptions(c))
	if err != nil {
		log.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	c.JSON(http.StatusOK, employees)
}
