package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type Event struct {
	base.Entity

	Name        string
	ImageUrl    string
	Description string
	BookingID   uint
	Tasks       []Task
	News        []News
	IsActive    bool
	Place       string
	Date        string
	Price       uint
}
