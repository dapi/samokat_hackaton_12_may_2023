package entity

import (
	"github.com/somnoynadno/zhumaysynba/internal/base"
	"time"
)

type Booking struct {
	base.Entity

	StartDateTime time.Time
	EndDatetime   time.Time
}
