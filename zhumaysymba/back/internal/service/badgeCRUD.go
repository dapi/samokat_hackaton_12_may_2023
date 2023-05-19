package service

import (
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/rocket"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type BadgeCRUD struct {
	storage   *dao.BadgeDAO
	rocketBot *rocket.BotIntegration
}

func NewBadgeCRUD(storage *dao.BadgeDAO, rocketBot *rocket.BotIntegration) *BadgeCRUD {
	return &BadgeCRUD{
		storage:   storage,
		rocketBot: rocketBot,
	}
}

func (s BadgeCRUD) Create(badge entity.Badge) (uint, error) {
	err := s.storage.Create(&badge)
	if err != nil {
		return 0, err
	}

	_ = s.rocketBot.SendMessage(
		fmt.Sprintf("Доступно новое достижение: **%s**\n\n[Посмотреть](%s/badges/%d) [ ](%s)",
			badge.Name,
			s.rocketBot.WebRedirectURL,
			badge.ID,
			badge.ImageURL,
		),
		"general",
		"general",
	)

	return badge.ID, nil
}

func (s BadgeCRUD) Retrieve(id uint) (*entity.Badge, error) {
	badge, err := s.storage.Retrieve(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return badge, nil
}

func (s BadgeCRUD) Update(badge entity.Badge) error {
	err := s.storage.Update(&badge)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}

	return nil
}

func (s BadgeCRUD) Delete(id uint) error {
	err := s.storage.Delete(id)
	if err != nil {
		return err
	}

	return nil
}

func (s BadgeCRUD) Get(options *processing.Options) ([]entity.Badge, error) {
	badges, err := s.storage.Get(options)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return badges, nil
		}

		return nil, err
	}

	return badges, nil
}
