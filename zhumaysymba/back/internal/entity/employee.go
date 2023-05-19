package entity

import (
	"github.com/somnoynadno/zhumaysynba/internal/base"
)

type Employee struct {
	base.Entity

	Name     string
	Balance  uint
	About    string
	ImageUrl string

	RocketChatID string

	EmployeeUnits []EmployeeUnits
	Tasks         []Task  `gorm:"many2many:employee_tasks"`
	BoughtGifts   []Gift  `gorm:"many2many:bought_gifts"`
	Badges        []Badge `gorm:"many2many:employee_badges"`
}
