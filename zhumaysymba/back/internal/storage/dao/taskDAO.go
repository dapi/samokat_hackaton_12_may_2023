package dao

import (
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"gorm.io/gorm"
)

type TaskDAO struct {
	db *gorm.DB
}

func NewTaskDAO(db *gorm.DB) *TaskDAO {
	return &TaskDAO{db: db}
}

func (s TaskDAO) Create(task *entity.Task) error {
	return s.db.Create(task).Error
}

func (s TaskDAO) Retrieve(taskID uint) (*entity.Task, error) {
	var task entity.Task
	err := s.db.Preload("Event").First(&task, taskID).Error
	return &task, err
}

func (s TaskDAO) Update(task *entity.Task) error {
	tx := s.db.Updates(task)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s TaskDAO) Delete(taskID uint) error {
	tx := s.db.Delete(&entity.Task{}, taskID)
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (s TaskDAO) Get(
	options *processing.Options,
) ([]entity.Task, error) {
	var tasks []entity.Task

	tx := s.db.Model(entity.Task{})
	tx, err := options.UseProcessing(tx)

	tx.Find(&tasks)
	if err != nil {
		return nil, err
	}
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 && !options.PaginationOptions.IsToApply {
		return nil, gorm.ErrRecordNotFound
	}

	return tasks, nil
}
