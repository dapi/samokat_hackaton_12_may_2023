package filter

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/enum"
	"go.uber.org/zap"
	"net/http"
	"strings"
)

const (
	OptionsContextKey = "filter_options"
)

func addFilterArgs(options *Options, fieldName string, c *gin.Context) {
	filterParamArray := c.QueryArray(fieldName)

	if len(filterParamArray) != 0 {
		for _, filterParam := range filterParamArray {
			if strings.Contains(filterParam, OperatorEquality) {
				filterParam = strings.ReplaceAll(filterParam, OperatorEquality, "")
				options.AddField(fieldName, filterParam, "=")
			} else if strings.Contains(filterParam, OperatorNotEquality) {
				filterParam = strings.ReplaceAll(filterParam, OperatorNotEquality, "")
				options.AddField(fieldName, filterParam, "!=")
			} else if strings.Contains(filterParam, OperatorLowerThan) {
				filterParam = strings.ReplaceAll(filterParam, OperatorLowerThan, "")
				options.AddField(fieldName, filterParam, "<")
			} else if strings.Contains(filterParam, OperatorLowerThanEq) {
				filterParam = strings.ReplaceAll(filterParam, OperatorLowerThanEq, "")
				options.AddField(fieldName, filterParam, "<=")
			} else if strings.Contains(filterParam, OperatorGreaterThan) {
				filterParam = strings.ReplaceAll(filterParam, OperatorGreaterThan, "")
				options.AddField(fieldName, filterParam, ">")
			} else if strings.Contains(filterParam, OperatorGreaterThanEq) {
				filterParam = strings.ReplaceAll(filterParam, OperatorGreaterThanEq, "")
				options.AddField(fieldName, filterParam, ">=")
			} else {
				options.AddField(fieldName, filterParam, "=")
			}
		}
	}
}

func ParseFilterArgument(logger zap.Logger, filterRules map[string]map[string]enum.ValidateType) gin.HandlerFunc {
	return func(c *gin.Context) {
		options := Options{}
		options.IsToApply = true

		argsURL := strings.Split(c.Request.RequestURI, "?")
		if len(argsURL) == 1 {
			options.IsToApply = false
			c.Set(OptionsContextKey, options)
			return
		}

		argsMas := strings.Split(argsURL[1], "&")

		var fieldNameString strings.Builder
		for _, rules := range filterRules {
			for nameColumn := range rules {
				addFilterArgs(&options, nameColumn, c)
				fieldNameString.WriteString(nameColumn)
			}
		}

		fieldNameString.WriteString("sort")
		fieldNameString.WriteString("limit")
		fieldNameString.WriteString("page")

		for index := range argsMas {
			argsName := strings.Split(argsMas[index], "=")[0]
			if !strings.Contains(fieldNameString.String(), argsName) {
				logger.Warn(fmt.Sprintf("the model does not have a field: %s", argsName))
				c.AbortWithStatusJSON(http.StatusBadRequest, nil)
				return
			}
		}

		if len(options.Fields) == 0 {
			options.IsToApply = false
		} else {
			if err := options.ValidateField(filterRules); err != nil {
				logger.Warn(fmt.Sprintf("error validate field: %v", err))
				c.AbortWithStatusJSON(http.StatusBadRequest, nil)
				return
			}
		}

		c.Set(OptionsContextKey, options)
	}
}
