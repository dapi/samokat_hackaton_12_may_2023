package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type ParkingSpace struct {
	base.Entity

	ParkingSpaceBooking []ParkingSpaceBooking
	OfficeID            uint
}
