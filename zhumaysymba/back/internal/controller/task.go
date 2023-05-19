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

type TaskController struct {
	logger  *zap.Logger
	service service.TaskCRUD
}

func NewTaskController(logger *zap.Logger, service service.TaskCRUD) TaskController {
	return TaskController{
		logger:  logger,
		service: service,
	}
}

func (a TaskController) CreateTask(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)

	var payload entity.Task
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

func (a TaskController) RetrieveTask(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	taskID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.Retrieve(uint(taskID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}

func (a TaskController) UpdateTask(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	taskID, _ := strconv.Atoi(c.Params.ByName("id"))

	var payload entity.Task
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	payload.ID = uint(taskID)
	err := a.service.Update(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a TaskController) DeleteTask(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	taskID, _ := strconv.Atoi(c.Params.ByName("id"))

	err := a.service.Delete(uint(taskID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a TaskController) GetTasks(c *gin.Context) {
	log := server.EnrichLogger(a.logger, c)

	tasks, err := a.service.Get(processing.GetOptions(c))
	if err != nil {
		log.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	c.JSON(http.StatusOK, tasks)
}
