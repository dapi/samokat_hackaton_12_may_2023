package service

import (
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/rocket"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type EmployeeTasksCRUD struct {
	storage   *dao.EmployeeTasksDAO
	rocketBot *rocket.BotIntegration
}

func NewEmployeeTasksCRUD(storage *dao.EmployeeTasksDAO, rocketBot *rocket.BotIntegration) *EmployeeTasksCRUD {
	return &EmployeeTasksCRUD{
		storage:   storage,
		rocketBot: rocketBot,
	}
}

func (s EmployeeTasksCRUD) StartEmployeeTask(employeeTasks entity.EmployeeTasks) (uint, error) {
	err := s.storage.Create(&employeeTasks)
	if err != nil {
		return 0, err
	}

	et, _ := s.storage.Retrieve(employeeTasks.ID)
	_ = s.rocketBot.SendMessage(
		fmt.Sprintf(
			"Вы начали выполнять задачу **%s**\n\n[Посмотреть](%s/events/%d)",
			et.Task.Name,
			s.rocketBot.WebRedirectURL,
			et.Task.EventID,
		),
		"direct",
		et.Employee.RocketChatID,
	)

	return employeeTasks.ID, nil
}

func (s EmployeeTasksCRUD) ChangeEmployeeTaskStatus(employeeTasks entity.EmployeeTasks) error {
	err := s.storage.Update(&employeeTasks)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}

	et, _ := s.storage.Retrieve(employeeTasks.ID)
	_ = s.rocketBot.SendMessage(
		fmt.Sprintf("Статус задания **%s** изменился на **%s**!",
			et.Task.Name, employeeTasks.Status),
		"direct",
		et.Employee.RocketChatID,
	)

	return nil
}

func (s EmployeeTasksCRUD) RetrieveEmployeeTaskList(employeeID uint) (*entity.EmployeeTasks, error) {
	employeeTasks, err := s.storage.RetrieveByEmployeeID(employeeID)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return employeeTasks, nil
}
