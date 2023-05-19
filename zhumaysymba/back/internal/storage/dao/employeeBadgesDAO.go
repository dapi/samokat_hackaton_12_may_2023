package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type EmployeeBadgesDAO struct {
	db *gorm.DB
}

func NewEmployeeBadgesDAO(db *gorm.DB) *EmployeeBadgesDAO {
	return &EmployeeBadgesDAO{db: db}
}

func (s EmployeeBadgesDAO) Create(employeeBadges *entity.EmployeeBadges) error {
	return s.db.Create(employeeBadges).Error
}

func (s EmployeeBadgesDAO) Retrieve(ID uint) (*entity.EmployeeBadges, error) {
	var employeeBadges entity.EmployeeBadges
	err := s.db.Preload("Employee").Preload("Badge").First(&employeeBadges, ID).Error
	return &employeeBadges, err
}

func (s EmployeeBadgesDAO) RetrieveByEmployeeID(employeeID uint) (*entity.EmployeeBadges, error) {
	var employeeBadges entity.EmployeeBadges
	err := s.db.Preload("Employee").Preload("Badge").
		Where("employee_id = ?", employeeID).First(&employeeBadges).Error
	return &employeeBadges, err
}

func (s EmployeeBadgesDAO) Update(employeeBadges *entity.EmployeeBadges) error {
	tx := s.db.Updates(employeeBadges)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s EmployeeBadgesDAO) Delete(employeeBadgesID uint) error {
	tx := s.db.Delete(&entity.EmployeeBadges{}, employeeBadgesID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s EmployeeBadgesDAO) Get(
	options *processing.Options,
) ([]entity.EmployeeBadges, error) {
	var employeeBadgess []entity.EmployeeBadges

	tx := s.db.Model(entity.EmployeeBadges{})
	tx, err := options.UseProcessing(tx)

	tx.Preload("Employee").Preload("Badge").Find(&employeeBadgess)
	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return employeeBadgess, nil
}
