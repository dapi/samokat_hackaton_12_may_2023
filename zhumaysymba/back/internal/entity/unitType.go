package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type UnitType struct {
	base.Entity

	Name  string
	Units []Unit
}
