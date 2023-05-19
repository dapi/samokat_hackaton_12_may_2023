package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type EmployeeDAO struct {
	db *gorm.DB
}

func NewEmployeeDAO(db *gorm.DB) *EmployeeDAO {
	return &EmployeeDAO{db: db}
}

func (s EmployeeDAO) Create(employee *entity.Employee) error {
	return s.db.Create(employee).Error
}

func (s EmployeeDAO) Retrieve(employeeID uint) (*entity.Employee, error) {
	var employee entity.Employee
	err := s.db.
		Preload("EmployeeUnits").
		Preload("Tasks").
		Preload("Badges").
		Preload("BoughtGifts").
		Preload("EmployeeUnits.Unit").
		First(&employee, employeeID).Error
	return &employee, err
}

func (s EmployeeDAO) Update(employee *entity.Employee) error {
	tx := s.db.Updates(employee)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s EmployeeDAO) Delete(employeeID uint) error {
	tx := s.db.Delete(&entity.Employee{}, employeeID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s EmployeeDAO) Get(
	options *processing.Options,
) ([]entity.Employee, error) {
	var employees []entity.Employee

	tx := s.db.Model(entity.Employee{})
	tx, err := options.UseProcessing(tx)

	tx.
		Preload("EmployeeUnits").
		Preload("EmployeeUnits.Unit").
		Find(&employees)

	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return employees, nil
}
