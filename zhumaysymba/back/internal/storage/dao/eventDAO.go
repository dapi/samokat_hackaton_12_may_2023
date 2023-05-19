package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type EventDAO struct {
	db *gorm.DB
}

func NewEventDAO(db *gorm.DB) *EventDAO {
	return &EventDAO{db: db}
}

func (s EventDAO) Create(event *entity.Event) error {
	return s.db.Create(event).Error
}

func (s EventDAO) Retrieve(eventID uint) (*entity.Event, error) {
	var event entity.Event
	err := s.db.
		Preload("Tasks").
		Preload("News").
		First(&event, eventID).Error
	return &event, err
}

func (s EventDAO) Update(event *entity.Event) error {
	tx := s.db.Updates(event)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s EventDAO) Delete(eventID uint) error {
	tx := s.db.Delete(&entity.Event{}, eventID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s EventDAO) Get(
	options *processing.Options,
) ([]entity.Event, error) {
	var events []entity.Event

	tx := s.db.Model(entity.Event{})
	tx, err := options.UseProcessing(tx)

	tx.Find(&events)
	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return events, nil
}
