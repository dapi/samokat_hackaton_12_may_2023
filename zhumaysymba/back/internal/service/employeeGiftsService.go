package service

import (
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/entity"
	"github.com/somnoynadno/zhumaysynba/internal/rocket"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"gorm.io/gorm"
)

type EmployeeGiftsService struct {
	storage         *dao.EmployeeGiftsDAO
	rocketBot       *rocket.BotIntegration
	employeeStorage *dao.EmployeeDAO
	giftStorage     *dao.GiftDAO
}

func NewEmployeeGiftsCRUD(storage *dao.EmployeeGiftsDAO, rocketBot *rocket.BotIntegration, employeeStorage *dao.EmployeeDAO, giftStorage *dao.GiftDAO) *EmployeeGiftsService {
	return &EmployeeGiftsService{
		storage:         storage,
		employeeStorage: employeeStorage,
		giftStorage:     giftStorage,
		rocketBot:       rocketBot,
	}
}

func (s EmployeeGiftsService) BuyGift(employeeGifts entity.EmployeeGifts) (uint, error) {
	employee, _ := s.employeeStorage.Retrieve(employeeGifts.EmployeeID)
	gift, _ := s.giftStorage.Retrieve(employeeGifts.GiftID)

	if employee.Balance < gift.Price {
		return 0, fmt.Errorf("not enough money")
	}

	err := s.storage.Create(&employeeGifts)
	if err != nil {
		return 0, err
	}
	employee.Balance -= gift.Price
	_ = s.employeeStorage.Update(employee)

	_ = s.rocketBot.SendMessage(
		fmt.Sprintf(
			"Вы приобрели товар **%s**\n\n[Посмотреть в профиле](%s/profile)[ ](%s)",
			gift.Name,
			s.rocketBot.WebRedirectURL,
			gift.Src,
		),
		"direct",
		employee.RocketChatID,
	)

	return employeeGifts.ID, nil
}

func (s EmployeeGiftsService) RetrieveEmployeeBoughtGifts(employeeID uint) (*entity.EmployeeGifts, error) {
	employeeGifts, err := s.storage.RetrieveByEmployeeID(employeeID)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return employeeGifts, nil
}
