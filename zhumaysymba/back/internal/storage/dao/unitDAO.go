package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type UnitDAO struct {
	db *gorm.DB
}

func NewUnitDAO(db *gorm.DB) *UnitDAO {
	return &UnitDAO{db: db}
}

func (s UnitDAO) Create(unit *entity.Unit) error {
	return s.db.Create(unit).Error
}

func (s UnitDAO) Retrieve(unitID uint) (*entity.Unit, error) {
	var unit entity.Unit
	err := s.db.
		Preload("RootUnit").
		Preload("Units").
		Preload("Units.Units").
		Preload("Units.Units.Units").
		Preload("EmployeeUnits").
		Preload("EmployeeUnits.Employee").
		First(&unit, unitID).Error
	return &unit, err
}

func (s UnitDAO) Update(unit *entity.Unit) error {
	tx := s.db.Updates(unit)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s UnitDAO) Delete(unitID uint) error {
	tx := s.db.Delete(&entity.Unit{}, unitID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s UnitDAO) Get(
	options *processing.Options,
) ([]entity.Unit, error) {
	var units []entity.Unit

	tx := s.db.Model(entity.Unit{})
	tx, err := options.UseProcessing(tx)

	tx.
		Preload("RootUnit").
		Preload("Units").
		Preload("Units.Units").
		Preload("Units.Units.Units").
		Preload("EmployeeUnits").
		Preload("EmployeeUnits.Employee").
		Find(&units)
	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return units, nil
}
