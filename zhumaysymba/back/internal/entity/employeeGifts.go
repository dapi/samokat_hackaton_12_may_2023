package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type EmployeeGifts struct {
	base.Entity

	EmployeeID uint
	Employee   *Employee
	GiftID     uint
	Gift       *Gift
}
