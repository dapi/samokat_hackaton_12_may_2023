package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type EmployeeTasks struct {
	base.Entity

	EmployeeID uint
	Employee   *Employee
	TaskID     uint
	Task       *Task

	Status string
}
