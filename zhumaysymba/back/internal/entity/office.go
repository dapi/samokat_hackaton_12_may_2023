package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type Office struct {
	base.Entity

	Name          string
	Address       string
	City          string
	Workplaces    []Workplace
	ParkingSpaces []ParkingSpace
	Rooms         []Room
}
