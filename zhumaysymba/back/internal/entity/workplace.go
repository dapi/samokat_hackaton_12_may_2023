package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type Workplace struct {
	base.Entity

	Floor            int
	WorkplaceBooking []WorkplaceBooking
	OfficeID         uint
}
