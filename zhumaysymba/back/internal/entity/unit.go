package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type Unit struct {
	base.Entity

	Name string

	UnitTypeID uint
	UnitType   *UnitType

	EmployeeUnits []EmployeeUnits

	RootUnitID *uint
	RootUnit   *Unit

	Units []Unit `gorm:"foreignkey:RootUnitID"`
}
