package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type Task struct {
	base.Entity

	Name         string
	Description  string
	Reward       int
	ratingReward int
	EventID      uint
	Event        *Event
	Employees    []Employee `gorm:"many2many:employee_tasks"`
}
