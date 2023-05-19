package service

import (
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/rocket"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type GiftCRUD struct {
	storage   *dao.GiftDAO
	rocketBot *rocket.BotIntegration
}

func NewGiftCRUD(storage *dao.GiftDAO, rocketBot *rocket.BotIntegration) *GiftCRUD {
	return &GiftCRUD{
		storage:   storage,
		rocketBot: rocketBot,
	}
}

func (s GiftCRUD) Create(gift entity.Gift) (uint, error) {
	err := s.storage.Create(&gift)
	if err != nil {
		return 0, err
	}

	_ = s.rocketBot.SendMessage(
		fmt.Sprintf("Доступен новый предмет для покупки: **%s** (%d coins)\n\n[Посмотреть в магазине](%s/market) [ ](%s)",
			gift.Name,
			gift.Price,
			s.rocketBot.WebRedirectURL,
			gift.Src,
		),
		"general",
		"general",
	)

	return gift.ID, nil
}

func (s GiftCRUD) Retrieve(id uint) (*entity.Gift, error) {
	gift, err := s.storage.Retrieve(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return gift, nil
}

func (s GiftCRUD) Update(gift entity.Gift) error {
	err := s.storage.Update(&gift)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}

	return nil
}

func (s GiftCRUD) Delete(id uint) error {
	err := s.storage.Delete(id)
	if err != nil {
		return err
	}

	return nil
}

func (s GiftCRUD) Get(options *processing.Options) ([]entity.Gift, error) {
	gifts, err := s.storage.Get(options)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return gifts, nil
		}

		return nil, err
	}

	return gifts, nil
}
