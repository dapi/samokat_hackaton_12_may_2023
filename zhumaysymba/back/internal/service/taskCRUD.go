package service

import (
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/rocket"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type TaskCRUD struct {
	storage   *dao.TaskDAO
	rocketBot *rocket.BotIntegration
}

func NewTaskCRUD(storage *dao.TaskDAO, rocketBot *rocket.BotIntegration) *TaskCRUD {
	return &TaskCRUD{
		storage:   storage,
		rocketBot: rocketBot,
	}
}

func (s TaskCRUD) Create(task entity.Task) (uint, error) {
	err := s.storage.Create(&task)
	if err != nil {
		return 0, err
	}

	_ = s.rocketBot.SendMessage(
		fmt.Sprintf(
			"Создана новая задача: %s\n\n[Посмотреть](%s/events/%d)",
			task.Name,
			s.rocketBot.WebRedirectURL,
			task.EventID,
		),
		"general",
		"general",
	)

	return task.ID, nil
}

func (s TaskCRUD) Retrieve(id uint) (*entity.Task, error) {
	task, err := s.storage.Retrieve(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return task, nil
}

func (s TaskCRUD) Update(task entity.Task) error {
	err := s.storage.Update(&task)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}

	return nil
}

func (s TaskCRUD) Delete(id uint) error {
	err := s.storage.Delete(id)
	if err != nil {
		return err
	}

	return nil
}

func (s TaskCRUD) Get(options *processing.Options) ([]entity.Task, error) {
	tasks, err := s.storage.Get(options)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return tasks, nil
		}

		return nil, err
	}

	return tasks, nil
}
