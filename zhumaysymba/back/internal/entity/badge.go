package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type Badge struct {
	base.Entity

	Name        string
	Description string
	ImageURL    string
	IsMain      bool

	Employees []Employee `gorm:"many2many:employee_badges"`
}
