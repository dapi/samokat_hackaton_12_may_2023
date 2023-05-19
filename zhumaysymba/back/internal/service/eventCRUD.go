package service

import (
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/rocket"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type EventCRUD struct {
	storage   *dao.EventDAO
	rocketBot *rocket.BotIntegration
}

func NewEventCRUD(storage *dao.EventDAO, rocketBot *rocket.BotIntegration) *EventCRUD {
	return &EventCRUD{
		storage:   storage,
		rocketBot: rocketBot,
	}
}

func (s EventCRUD) Create(event entity.Event) (uint, error) {
	err := s.storage.Create(&event)
	if err != nil {
		return 0, err
	}

	_ = s.rocketBot.SendMessage(
		fmt.Sprintf(
			"**%s**\n%s\n\n[Подробнее](%s/events/%d)[ ](%s)",
			event.Name,
			event.Description,
			s.rocketBot.WebRedirectURL,
			event.ID,
			event.ImageUrl,
		),
		"general",
		"general",
	)

	return event.ID, nil
}

func (s EventCRUD) Retrieve(id uint) (*entity.Event, error) {
	event, err := s.storage.Retrieve(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return event, nil
}

func (s EventCRUD) Update(event entity.Event) error {
	err := s.storage.Update(&event)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}

	return nil
}

func (s EventCRUD) Delete(id uint) error {
	err := s.storage.Delete(id)
	if err != nil {
		return err
	}

	return nil
}

func (s EventCRUD) Get(options *processing.Options) ([]entity.Event, error) {
	events, err := s.storage.Get(options)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return events, nil
		}

		return nil, err
	}

	return events, nil
}
