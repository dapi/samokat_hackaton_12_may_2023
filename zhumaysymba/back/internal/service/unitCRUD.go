package service

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type UnitCRUD struct {
	storage *dao.UnitDAO
}

func NewUnitCRUD(storage *dao.UnitDAO) *UnitCRUD {
	return &UnitCRUD{
		storage: storage,
	}
}

func (s UnitCRUD) Create(unit entity.Unit) (uint, error) {
	err := s.storage.Create(&unit)
	if err != nil {
		return 0, err
	}

	return unit.ID, nil
}

func (s UnitCRUD) Retrieve(id uint) (*entity.Unit, error) {
	unit, err := s.storage.Retrieve(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return unit, nil
}

func (s UnitCRUD) Update(unit entity.Unit) error {
	err := s.storage.Update(&unit)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}

	return nil
}

func (s UnitCRUD) Delete(id uint) error {
	err := s.storage.Delete(id)
	if err != nil {
		return err
	}

	return nil
}

func (s UnitCRUD) Get(options *processing.Options) ([]entity.Unit, error) {
	units, err := s.storage.Get(options)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return units, nil
		}

		return nil, err
	}

	return units, nil
}
