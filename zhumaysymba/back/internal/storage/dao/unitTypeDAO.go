package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type UnitTypeDAO struct {
	db *gorm.DB
}

func NewUnitTypeDAO(db *gorm.DB) *UnitTypeDAO {
	return &UnitTypeDAO{db: db}
}

func (s UnitTypeDAO) Create(unitType *entity.UnitType) error {
	return s.db.Create(unitType).Error
}

func (s UnitTypeDAO) Retrieve(unitTypeID uint) (*entity.UnitType, error) {
	var unitType entity.UnitType
	err := s.db.First(&unitType, unitTypeID).Error
	return &unitType, err
}

func (s UnitTypeDAO) Update(unitType *entity.UnitType) error {
	tx := s.db.Updates(unitType)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s UnitTypeDAO) Delete(unitTypeID uint) error {
	tx := s.db.Delete(&entity.UnitType{}, unitTypeID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s UnitTypeDAO) Get(
	options *processing.Options,
) ([]entity.UnitType, error) {
	var unitTypes []entity.UnitType

	tx := s.db.Model(entity.UnitType{})
	tx, err := options.UseProcessing(tx)

	tx.Find(&unitTypes)
	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return unitTypes, nil
}
