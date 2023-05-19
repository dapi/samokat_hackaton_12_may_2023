package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type NewsDAO struct {
	db *gorm.DB
}

func NewNewsDAO(db *gorm.DB) *NewsDAO {
	return &NewsDAO{db: db}
}

func (s NewsDAO) Create(news *entity.News) error {
	return s.db.Create(news).Error
}

func (s NewsDAO) Retrieve(newsID uint) (*entity.News, error) {
	var news entity.News
	err := s.db.First(&news, newsID).Error
	return &news, err
}

func (s NewsDAO) Update(news *entity.News) error {
	tx := s.db.Updates(news)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s NewsDAO) Delete(newsID uint) error {
	tx := s.db.Delete(&entity.News{}, newsID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s NewsDAO) Get(
	options *processing.Options,
) ([]entity.News, error) {
	var newss []entity.News

	tx := s.db.Model(entity.News{})
	tx, err := options.UseProcessing(tx)

	tx.Find(&newss)
	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return newss, nil
}
