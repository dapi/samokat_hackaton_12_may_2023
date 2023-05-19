package main

import (
	"fmt"
	"github.com/kelseyhightower/envconfig"
	"github.com/somnoynadno/zhumaysynba/cmd/api/config"
	"github.com/somnoynadno/zhumaysynba/internal/common/router"
	"github.com/somnoynadno/zhumaysynba/internal/controller"
	"github.com/somnoynadno/zhumaysynba/internal/rocket"
	"github.com/somnoynadno/zhumaysynba/internal/server"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/service"
	"github.com/somnoynadno/zhumaysynba/internal/storage/dao"
	"github.com/somnoynadno/zhumaysynba/internal/storage/migration"
	"github.com/somnoynadno/zhumaysynba/internal/telemetry/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	logger := log.NewLogger()

	var cfg config.Config
	err := envconfig.Process("API", &cfg)
	if err != nil {
		logger.Fatal(err.Error())
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable",
		cfg.DB.Host, cfg.DB.User, cfg.DB.Password, cfg.DB.Name, cfg.DB.Port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		logger.Fatal(fmt.Sprintf("can't connect to database: %v", err))
	}

	logger.Info(fmt.Sprintf("successfully connected to database %s on %s:%d as %s",
		cfg.DB.Name, cfg.DB.Host, cfg.DB.Port, cfg.DB.User))

	err = migration.Migrate(db)
	if err != nil {
		logger.Fatal(fmt.Sprintf("failed to migrate database: %v", err))
	}
	logger.Info("database migrated successfully")

	rocketBot := rocket.NewBotIntegration(cfg.RocketBot.URL, cfg.RocketBot.WebRedirectURL)

	dp := processing.NewDataProcessing("created_at", "ASC", 10)

	employeeDAO := dao.NewEmployeeDAO(db)
	giftDAO := dao.NewGiftDAO(db)
	employeeCRUD := service.NewEmployeeCRUD(employeeDAO, rocketBot)
	unitCRUD := service.NewUnitCRUD(dao.NewUnitDAO(db))
	unitTypeCRUD := service.NewUnitTypeCRUD(dao.NewUnitTypeDAO(db))
	newsCRUD := service.NewNewsCRUD(dao.NewNewsDAO(db), rocketBot)
	eventCRUD := service.NewEventCRUD(dao.NewEventDAO(db), rocketBot)
	badgeCRUD := service.NewBadgeCRUD(dao.NewBadgeDAO(db), rocketBot)
	giftCRUD := service.NewGiftCRUD(giftDAO, rocketBot)
	taskCRUD := service.NewTaskCRUD(dao.NewTaskDAO(db), rocketBot)
	employeeBadgesCRUD := service.NewEmployeeBadgesCRUD(dao.NewEmployeeBadgesDAO(db), rocketBot)
	employeeGiftsCRUD := service.NewEmployeeGiftsCRUD(dao.NewEmployeeGiftsDAO(db), rocketBot, employeeDAO, giftDAO)
	employeeTasksCRUD := service.NewEmployeeTasksCRUD(dao.NewEmployeeTasksDAO(db), rocketBot)

	employeeController := controller.NewEmployeeController(logger, *employeeCRUD)
	unitController := controller.NewUnitController(logger, *unitCRUD)
	unitTypeController := controller.NewUnitTypeController(logger, *unitTypeCRUD)
	newsController := controller.NewNewsController(logger, *newsCRUD)
	eventController := controller.NewEventController(logger, *eventCRUD)
	badgeController := controller.NewBadgeController(logger, *badgeCRUD)
	giftController := controller.NewGiftController(logger, *giftCRUD)
	taskController := controller.NewTaskController(logger, *taskCRUD)
	employeeBadgesController := controller.NewEmployeeBadgesController(logger, *employeeBadgesCRUD)
	employeeGiftsController := controller.NewEmployeeGiftsController(logger, *employeeGiftsCRUD)
	employeeTasksController := controller.NewEmployeeTasksController(logger, *employeeTasksCRUD)

	baseRouter := router.NewRouter(
		newsController,
		employeeController,
		unitController,
		unitTypeController,
		eventController,
		badgeController,
		giftController,
		taskController,
		employeeBadgesController,
		employeeGiftsController,
		employeeTasksController,
	)

	srv := new(server.Server)
	go func() {
		if err := srv.Run(cfg.Server.Host, cfg.Server.Port, baseRouter.InitRoutes(dp)); err != nil {
			logger.Fatal(fmt.Sprintf("listen and serve: %s", err.Error()))
		}
	}()

	// handle signals
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	logger.Warn("shutting down server")
}
