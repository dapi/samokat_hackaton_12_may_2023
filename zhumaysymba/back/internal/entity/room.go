package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type Room struct {
	base.Entity

	RoomType    string
	Floor       int
	RoomBooking []RoomBooking
	OfficeID    uint
}
