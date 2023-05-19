package entity

import (
	"github.com/somnoynadno/zhumaysynba/internal/base"
)

type Gift struct {
	base.Entity

	Name        string
	Description string
	Category    string
	Price       uint
	Src         string
	Customers   []Employee `gorm:"many2many:bought_gifts"`
}
