package sort

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/enum"
	"go.uber.org/zap"
	"net/http"
	"strings"
)

const (
	ASC               = "ASC"
	DESC              = "DESC"
	OptionsContextKey = "sort_options"
	sortArgsKey       = "sort"
)

func ParseSortingArgument(
	logger zap.Logger,
	defaultSortField string,
	defaultSortOrder string,
	validateMap map[string]enum.ValidateType) gin.HandlerFunc {
	return func(c *gin.Context) {
		sortArgs := c.Query(sortArgsKey)
		sortBy := defaultSortField
		sortOrder := defaultSortOrder

		if !checkThereField(validateMap, sortBy) {
			logger.Warn(fmt.Sprintf("the model does not have a field: %s", sortBy))
			c.AbortWithStatusJSON(http.StatusBadRequest, nil)
			return
		}

		if sortArgs != "" {
			sortArgsArray := strings.Split(sortArgs, ".")
			sortBy = sortArgsArray[0]
			if len(sortArgsArray) == 2 {
				sortOrder = sortArgsArray[1]
				if strings.ToUpper(sortOrder) != ASC && strings.ToUpper(sortOrder) != DESC {
					logger.Warn(fmt.Sprintf("unexpected sort parameters: %s", sortArgs))
					c.AbortWithStatusJSON(http.StatusBadRequest, nil)
					return
				}
			}
		}

		options := Options{
			Field: sortBy,
			Order: sortOrder,
		}

		c.Set(OptionsContextKey, options)
	}
}

func checkThereField(validateMap map[string]enum.ValidateType, fieldName string) bool {
	var validateString strings.Builder
	for nameField := range validateMap {
		validateString.WriteString(nameField)
	}
	validateString.WriteString("id created_at updated_at deleted_at archived_at")
	return strings.Contains(validateString.String(), fieldName)
}
