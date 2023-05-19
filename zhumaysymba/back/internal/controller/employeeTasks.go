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

type EmployeeTasksController struct {
	logger  *zap.Logger
	service service.EmployeeTasksCRUD
}

func NewEmployeeTasksController(logger *zap.Logger, service service.EmployeeTasksCRUD) EmployeeTasksController {
	return EmployeeTasksController{
		logger:  logger,
		service: service,
	}
}

func (a EmployeeTasksController) StartEmployeeTask(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)

	var payload entity.EmployeeTasks
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	payload.Status = "started"

	_, err := a.service.StartEmployeeTask(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a EmployeeTasksController) RetrieveEmployeeTasks(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	employeeTasksID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.RetrieveEmployeeTaskList(uint(employeeTasksID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}

// Тут надо метод, который будет ставить статус задачи в "выполнено"
func (a EmployeeTasksController) SetEmployeeTaskStatus(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	employeeTasksID, _ := strconv.Atoi(c.Params.ByName("id"))

	var payload entity.EmployeeTasks
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	payload.ID = uint(employeeTasksID)
	err := a.service.ChangeEmployeeTaskStatus(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}
