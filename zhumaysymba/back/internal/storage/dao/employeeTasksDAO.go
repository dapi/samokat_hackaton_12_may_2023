package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type EmployeeTasksDAO struct {
	db *gorm.DB
}

func NewEmployeeTasksDAO(db *gorm.DB) *EmployeeTasksDAO {
	return &EmployeeTasksDAO{db: db}
}

func (s EmployeeTasksDAO) Create(employeeTasks *entity.EmployeeTasks) error {
	return s.db.Create(employeeTasks).Error
}

func (s EmployeeTasksDAO) Retrieve(ID uint) (*entity.EmployeeTasks, error) {
	var employeeTasks entity.EmployeeTasks
	err := s.db.Preload("Employee").Preload("Task").First(&employeeTasks, ID).Error
	return &employeeTasks, err
}

func (s EmployeeTasksDAO) RetrieveByEmployeeID(employeeID uint) (*entity.EmployeeTasks, error) {
	var employeeTasks entity.EmployeeTasks
	err := s.db.Preload("Employee").Preload("Task").
		Where("employee_id = ?", employeeID).First(&employeeTasks).Error
	return &employeeTasks, err
}

func (s EmployeeTasksDAO) Update(employeeTasks *entity.EmployeeTasks) error {
	tx := s.db.Updates(employeeTasks)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s EmployeeTasksDAO) Delete(employeeTasksID uint) error {
	tx := s.db.Delete(&entity.EmployeeTasks{}, employeeTasksID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s EmployeeTasksDAO) Get(
	options *processing.Options,
) ([]entity.EmployeeTasks, error) {
	var employeeTaskss []entity.EmployeeTasks

	tx := s.db.Model(entity.EmployeeTasks{})
	tx, err := options.UseProcessing(tx)

	tx.Preload("Employee").Preload("Task").Find(&employeeTaskss)
	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return employeeTaskss, nil
}
