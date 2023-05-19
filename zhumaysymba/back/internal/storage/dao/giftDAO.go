package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type GiftDAO struct {
	db *gorm.DB
}

func NewGiftDAO(db *gorm.DB) *GiftDAO {
	return &GiftDAO{db: db}
}

func (s GiftDAO) Create(gift *entity.Gift) error {
	return s.db.Create(gift).Error
}

func (s GiftDAO) Retrieve(giftID uint) (*entity.Gift, error) {
	var gift entity.Gift
	err := s.db.First(&gift, giftID).Error
	return &gift, err
}

func (s GiftDAO) Update(gift *entity.Gift) error {
	tx := s.db.Updates(gift)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s GiftDAO) Delete(giftID uint) error {
	tx := s.db.Delete(&entity.Gift{}, giftID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s GiftDAO) Get(
	options *processing.Options,
) ([]entity.Gift, error) {
	var gifts []entity.Gift

	tx := s.db.Model(entity.Gift{})
	tx, err := options.UseProcessing(tx)

	tx.Find(&gifts)
	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return gifts, nil
}
