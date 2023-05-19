package service

import (
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/rocket"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type EmployeeBadgesCRUD struct {
	storage   *dao.EmployeeBadgesDAO
	rocketBot *rocket.BotIntegration
}

func NewEmployeeBadgesCRUD(storage *dao.EmployeeBadgesDAO, rocketBot *rocket.BotIntegration) *EmployeeBadgesCRUD {
	return &EmployeeBadgesCRUD{
		storage:   storage,
		rocketBot: rocketBot,
	}
}

func (s EmployeeBadgesCRUD) AssignBadge(employeeBadges entity.EmployeeBadges) (uint, error) {
	err := s.storage.Create(&employeeBadges)
	if err != nil {
		return 0, err
	}

	eb, _ := s.storage.Retrieve(employeeBadges.ID)
	_ = s.rocketBot.SendMessage(
		fmt.Sprintf(
			"Вы получили достижение **%s**\n\n[Перейти в профиль](%s/employee/%d) [ ](%s)",
			eb.Badge.Name,
			s.rocketBot.WebRedirectURL,
			eb.Employee.ID,
			eb.Badge.ImageURL,
		),
		"direct",
		eb.Employee.RocketChatID,
	)

	return employeeBadges.ID, nil
}

func (s EmployeeBadgesCRUD) RetrieveEmployeeBadges(id uint) (*entity.EmployeeBadges, error) {
	employeeBadges, err := s.storage.RetrieveByEmployeeID(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return employeeBadges, nil
}
