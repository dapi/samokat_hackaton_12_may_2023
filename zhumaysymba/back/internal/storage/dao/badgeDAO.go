package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type BadgeDAO struct {
	db *gorm.DB
}

func NewBadgeDAO(db *gorm.DB) *BadgeDAO {
	return &BadgeDAO{db: db}
}

func (s BadgeDAO) Create(badge *entity.Badge) error {
	return s.db.Create(badge).Error
}

func (s BadgeDAO) Retrieve(badgeID uint) (*entity.Badge, error) {
	var badge entity.Badge
	err := s.db.First(&badge, badgeID).Error
	return &badge, err
}

func (s BadgeDAO) Update(badge *entity.Badge) error {
	tx := s.db.Updates(badge)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s BadgeDAO) Delete(badgeID uint) error {
	tx := s.db.Delete(&entity.Badge{}, badgeID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s BadgeDAO) Get(
	options *processing.Options,
) ([]entity.Badge, error) {
	var badges []entity.Badge

	tx := s.db.Model(entity.Badge{})
	tx, err := options.UseProcessing(tx)

	tx.Find(&badges)
	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return badges, nil
}
