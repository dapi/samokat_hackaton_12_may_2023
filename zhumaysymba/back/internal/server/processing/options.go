package processing

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/filter"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/pagination"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/sort"
	"gorm.io/gorm"
)

type Options struct {
	FilterOptions     *filter.Options
	SortOptions       *sort.Options
	PaginationOptions *pagination.Options
}

// GetOptions returns Options from context.
func GetOptions(c *gin.Context) *Options {
	filterOptionsCtx, ok := c.Get(filter.OptionsContextKey)
	if !ok {
		newFilterOptions := filter.Options{}
		newFilterOptions.IsToApply = false
		filterOptionsCtx = newFilterOptions
	}
	filterOptions := filterOptionsCtx.(filter.Options)

	sortOptionsCtx, _ := c.Get(sort.OptionsContextKey)
	sortOptions := sortOptionsCtx.(sort.Options)

	paginationOptionsCtx, _ := c.Get(pagination.OptionsContextKey)
	paginationOptions := paginationOptionsCtx.(pagination.Options)

	return &Options{
		FilterOptions:     &filterOptions,
		SortOptions:       &sortOptions,
		PaginationOptions: &paginationOptions,
	}
}

// UseProcessing use all Options function
func (o *Options) UseProcessing(tx *gorm.DB) (*gorm.DB, error) {
	if o.FilterOptions.IsToApply {
		mapConditionsFilter, err := o.FilterOptions.CreateConditionsFilter()
		if err != nil {
			return nil, err
		}
		for nameOperator, value := range mapConditionsFilter {
			tx.Where(nameOperator, value)
		}
	}

	tx.Order(fmt.Sprintf("%s %s", o.SortOptions.Field, o.SortOptions.Order))

	if o.PaginationOptions.IsToApply {
		tx.Limit(o.PaginationOptions.Limit).Offset(o.PaginationOptions.Offset)
	}

	return tx, nil
}
