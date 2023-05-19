package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type EmployeeUnits struct {
	base.Entity

	Role string

	EmployeeID uint
	Employee   *Employee

	UnitID uint
	Unit   *Unit
}
