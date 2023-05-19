package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type EmployeeGiftsDAO struct {
	db *gorm.DB
}

func NewEmployeeGiftsDAO(db *gorm.DB) *EmployeeGiftsDAO {
	return &EmployeeGiftsDAO{db: db}
}

func (s EmployeeGiftsDAO) Create(employeeGifts *entity.EmployeeGifts) error {
	return s.db.Create(employeeGifts).Error
}

func (s EmployeeGiftsDAO) Retrieve(ID uint) (*entity.EmployeeGifts, error) {
	var employeeGifts entity.EmployeeGifts
	err := s.db.Preload("Employee").Preload("Gift").First(&employeeGifts, ID).Error
	return &employeeGifts, err
}

func (s EmployeeGiftsDAO) RetrieveByEmployeeID(employeeID uint) (*entity.EmployeeGifts, error) {
	var employeeGifts entity.EmployeeGifts
	err := s.db.Preload("Employee").Preload("Gift").
		Where("employee_id = ?", employeeID).First(&employeeGifts).Error
	return &employeeGifts, err
}

func (s EmployeeGiftsDAO) Update(employeeGifts *entity.EmployeeGifts) error {
	tx := s.db.Updates(employeeGifts)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s EmployeeGiftsDAO) Delete(employeeGiftsID uint) error {
	tx := s.db.Delete(&entity.EmployeeGifts{}, employeeGiftsID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s EmployeeGiftsDAO) Get(
	options *processing.Options,
) ([]entity.EmployeeGifts, error) {
	var employeeGifts []entity.EmployeeGifts

	tx := s.db.Model(entity.EmployeeGifts{})
	tx, err := options.UseProcessing(tx)

	tx.Preload("Employee").Preload("Gift").Find(&employeeGifts)
	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return employeeGifts, nil
}
