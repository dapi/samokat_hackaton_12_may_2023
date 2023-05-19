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

type NewsController struct {
	logger  *zap.Logger
	service service.NewsCRUD
}

func NewNewsController(logger *zap.Logger, service service.NewsCRUD) NewsController {
	return NewsController{
		logger:  logger,
		service: service,
	}
}

func (a NewsController) CreateNews(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)

	var payload entity.News
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

func (a NewsController) RetrieveNews(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	newsID, _ := strconv.Atoi(c.Params.ByName("id"))

	result, err := a.service.Retrieve(uint(newsID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, result)
}

func (a NewsController) UpdateNews(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	newsID, _ := strconv.Atoi(c.Params.ByName("id"))

	var payload entity.News
	if err := c.ShouldBindJSON(&payload); err != nil {
		logger.Warn("error parsing json: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	payload.ID = uint(newsID)
	err := a.service.Update(payload)
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a NewsController) DeleteNews(c *gin.Context) {
	logger := server.EnrichLogger(a.logger, c)
	newsID, _ := strconv.Atoi(c.Params.ByName("id"))

	err := a.service.Delete(uint(newsID))
	if err != nil {
		logger.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, nil)
}

func (a NewsController) GetNewsList(c *gin.Context) {
	log := server.EnrichLogger(a.logger, c)

	news, err := a.service.Get(processing.GetOptions(c))
	if err != nil {
		log.Warn("error occurred: " + err.Error())
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	c.JSON(http.StatusOK, news)
}
