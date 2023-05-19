package service

import (
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/rocket"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type EmployeeCRUD struct {
	storage   *dao.EmployeeDAO
	rocketBot *rocket.BotIntegration
}

func NewEmployeeCRUD(storage *dao.EmployeeDAO, rocketBot *rocket.BotIntegration) *EmployeeCRUD {
	return &EmployeeCRUD{
		storage:   storage,
		rocketBot: rocketBot,
	}
}

func (s EmployeeCRUD) Create(employee entity.Employee) (uint, error) {
	err := s.storage.Create(&employee)
	if err != nil {
		return 0, err
	}

	_ = s.rocketBot.SendMessage(
		fmt.Sprintf(
			"К нам присоединился **%s**! Поприветствуем @%s",
			employee.Name,
			employee.RocketChatID,
		),
		"general",
		"general",
	)

	return employee.ID, nil
}

func (s EmployeeCRUD) Retrieve(id uint) (*entity.Employee, error) {
	employee, err := s.storage.Retrieve(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return employee, nil
}

func (s EmployeeCRUD) Update(employee entity.Employee) error {
	err := s.storage.Update(&employee)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}

	return nil
}

func (s EmployeeCRUD) Delete(id uint) error {
	err := s.storage.Delete(id)
	if err != nil {
		return err
	}

	return nil
}

func (s EmployeeCRUD) Get(options *processing.Options) ([]entity.Employee, error) {
	employees, err := s.storage.Get(options)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return employees, nil
		}

		return nil, err
	}

	return employees, nil
}
