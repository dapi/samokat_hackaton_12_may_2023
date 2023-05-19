package migration

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&entity.News{},
		&entity.Event{},
		&entity.Task{},
		&entity.UnitType{},
		&entity.Unit{},
		&entity.Gift{},
		&entity.Badge{},
		&entity.Employee{},
		&entity.EmployeeUnits{},
		&entity.EmployeeTasks{},
		&entity.EmployeeGifts{},
		&entity.EmployeeBadges{},
	)
}
