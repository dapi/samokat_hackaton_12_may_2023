package service

import (
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/rocket"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type NewsCRUD struct {
	storage   *dao.NewsDAO
	rocketBot *rocket.BotIntegration
}

func NewNewsCRUD(storage *dao.NewsDAO, rocketBot *rocket.BotIntegration) *NewsCRUD {
	return &NewsCRUD{
		storage:   storage,
		rocketBot: rocketBot,
	}
}

func (s NewsCRUD) Create(news entity.News) (uint, error) {
	err := s.storage.Create(&news)
	if err != nil {
		return 0, err
	}
	_ = s.rocketBot.SendMessage(
		fmt.Sprintf(
			"**%s**\n%s\n\n[Читать полностью](%s/events/%d) [ ](%s)",
			news.Title,
			news.Body,
			s.rocketBot.WebRedirectURL,
			news.ID,
			news.ImageUrl,
		),
		"general",
		"general",
	)

	return news.ID, nil
}

func (s NewsCRUD) Retrieve(id uint) (*entity.News, error) {
	news, err := s.storage.Retrieve(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return news, nil
}

func (s NewsCRUD) Update(news entity.News) error {
	err := s.storage.Update(&news)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}

	return nil
}

func (s NewsCRUD) Delete(id uint) error {
	err := s.storage.Delete(id)
	if err != nil {
		return err
	}

	return nil
}

func (s NewsCRUD) Get(options *processing.Options) ([]entity.News, error) {
	news, err := s.storage.Get(options)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return news, nil
		}

		return nil, err
	}

	return news, nil
}
