package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type News struct {
	base.Entity

	IsMain   bool // Является ли новость новостью дня
	Title    string
	ImageUrl string
	Body     string

	EventID *uint
	Event   *Event
}
