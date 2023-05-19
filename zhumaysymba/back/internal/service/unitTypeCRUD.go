package service

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type UnitTypeCRUD struct {
	storage *dao.UnitTypeDAO
}

func NewUnitTypeCRUD(storage *dao.UnitTypeDAO) *UnitTypeCRUD {
	return &UnitTypeCRUD{
		storage: storage,
	}
}

func (s UnitTypeCRUD) Create(unitType entity.UnitType) (uint, error) {
	err := s.storage.Create(&unitType)
	if err != nil {
		return 0, err
	}

	return unitType.ID, nil
}

func (s UnitTypeCRUD) Retrieve(id uint) (*entity.UnitType, error) {
	unitType, err := s.storage.Retrieve(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return unitType, nil
}

func (s UnitTypeCRUD) Update(unitType entity.UnitType) error {
	err := s.storage.Update(&unitType)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}

	return nil
}

func (s UnitTypeCRUD) Delete(id uint) error {
	err := s.storage.Delete(id)
	if err != nil {
		return err
	}

	return nil
}

func (s UnitTypeCRUD) Get(options *processing.Options) ([]entity.UnitType, error) {
	unitTypes, err := s.storage.Get(options)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return unitTypes, nil
		}

		return nil, err
	}

	return unitTypes, nil
}
