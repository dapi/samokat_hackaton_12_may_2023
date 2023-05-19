package processing

import (
	"github.com/gin-gonic/gin"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/enum"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/filter"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/pagination"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/sort"
	"go.uber.org/zap"
	"sync"
)

type DataProcessingConfig struct {
	DefaultSortField string
	DefaultSortOrder string
	DefaultLimit     int
}

func NewDataProcessingConfig(
	defaultSortField string,
	defaultSortOrder string,
	defaultLimit int,
) *DataProcessingConfig {
	return &DataProcessingConfig{
		DefaultSortField: defaultSortField,
		DefaultSortOrder: defaultSortOrder,
		DefaultLimit:     defaultLimit,
	}
}

type DataProcessing struct {
	config *DataProcessingConfig
}

func NewDataProcessing(
	defaultSortField string,
	defaultSortOrder string,
	defaultLimit int,
) *DataProcessing {
	return &DataProcessing{
		config: NewDataProcessingConfig(defaultSortField, defaultSortOrder, defaultLimit),
	}
}

func (p DataProcessing) ApplyMiddleware(
	logger zap.Logger,
	filterRules map[string]map[string]enum.ValidateType,
	sortRules map[string]enum.ValidateType,
) gin.HandlerFunc {
	handlers := gin.HandlersChain{
		pagination.ParsePaginationArgument(logger, p.config.DefaultLimit),
		filter.ParseFilterArgument(logger, filterRules),
		sort.ParseSortingArgument(logger, p.config.DefaultSortField, p.config.DefaultSortOrder, sortRules),
	}

	return func(c *gin.Context) {
		var wg sync.WaitGroup
		wg.Add(len(handlers))
		for _, h := range handlers {
			go func(handler gin.HandlerFunc) {
				handler(c)
				wg.Done()
			}(h)
		}
		wg.Wait()
		c.Next()
	}
}
