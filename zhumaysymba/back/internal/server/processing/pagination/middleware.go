package pagination

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net/http"
	"strconv"
)

const (
	OptionsContextKey = "pagination_options"
	pageKey           = "page"
	limitKey          = "limit"
)

func ParsePaginationArgument(logger zap.Logger, defaultLimit int) gin.HandlerFunc {
	return func(c *gin.Context) {
		limitStr := c.DefaultQuery(limitKey, strconv.Itoa(defaultLimit))
		pageStr := c.DefaultQuery(pageKey, "1")

		if limitStr == strconv.Itoa(defaultLimit) && pageStr == "1" {
			c.Set(OptionsContextKey, Options{
				IsToApply: false,
			})
			return
		}

		limit, err := strconv.Atoi(limitStr)
		if err != nil || limit <= 0 {
			logger.Warn("failed pagination parameters")
			c.AbortWithStatusJSON(http.StatusBadRequest, nil)
			return
		}

		page, err := strconv.Atoi(pageStr)
		if err != nil || page <= 0 {
			logger.Warn("failed pagination parameters")
			c.AbortWithStatusJSON(http.StatusBadRequest, nil)
			return
		}

		options := Options{
			IsToApply: true,
			Limit:     limit,
			Offset:    limit * (page - 1),
		}

		c.Set(OptionsContextKey, options)
	}
}
