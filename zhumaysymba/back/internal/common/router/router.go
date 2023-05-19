package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/somnoynadno/zhumaysynba/internal/base"
	"github.com/somnoynadno/zhumaysynba/internal/controller"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/enum"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/filter"
	"github.com/somnoynadno/zhumaysynba/internal/telemetry/log"
)

func filteringRules() map[string]map[string]enum.ValidateType {
	return filter.GetFilterRules(
		base.Entity{},
		"",
		map[string]map[string]enum.ValidateType{
			"classes": {
				"name": enum.TYPE_STRING,
			},
		},
	)
}

type Router struct {
	newsController           controller.NewsController
	employeeController       controller.EmployeeController
	unitController           controller.UnitController
	unitTypeController       controller.UnitTypeController
	eventController          controller.EventController
	badgeController          controller.BadgeController
	giftController           controller.GiftController
	taskController           controller.TaskController
	employeeBadgesController controller.EmployeeBadgesController
	employeeGiftsController  controller.EmployeeGiftsController
	employeeTasksController  controller.EmployeeTasksController
}

func NewRouter(
	newsController controller.NewsController,
	employeeController controller.EmployeeController,
	unitController controller.UnitController,
	unitTypeController controller.UnitTypeController,
	eventController controller.EventController,
	badgeController controller.BadgeController,
	giftController controller.GiftController,
	taskController controller.TaskController,
	employeeBadgesController controller.EmployeeBadgesController,
	employeeGiftsController controller.EmployeeGiftsController,
	employeeTasksController controller.EmployeeTasksController,
) *Router {
	return &Router{
		newsController:           newsController,
		employeeController:       employeeController,
		unitController:           unitController,
		unitTypeController:       unitTypeController,
		eventController:          eventController,
		badgeController:          badgeController,
		giftController:           giftController,
		taskController:           taskController,
		employeeBadgesController: employeeBadgesController,
		employeeGiftsController:  employeeGiftsController,
		employeeTasksController:  employeeTasksController,
	}
}

func (h Router) InitRoutes(
	dp *processing.DataProcessing,
) *gin.Engine {
	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(cors.Default())

	api := router.Group("/api")
	v1 := api.Group("/v1")
	{
		news := v1.Group("news")
		{
			news.GET("",
				dp.ApplyMiddleware(*log.NewLogger(), filteringRules(), nil),
				h.newsController.GetNewsList)
			news.POST("", h.newsController.CreateNews)
			news.GET(":id", h.newsController.RetrieveNews)
			news.PUT(":id", h.newsController.UpdateNews)
			news.DELETE(":id", h.newsController.DeleteNews)
		}
		employee := v1.Group("employee")
		{
			employee.GET("",
				dp.ApplyMiddleware(*log.NewLogger(), filteringRules(), nil),
				h.employeeController.GetEmployees)
			employee.POST("", h.employeeController.CreateEmployee)
			employee.GET(":id", h.employeeController.RetrieveEmployee)
			employee.PUT(":id", h.employeeController.UpdateEmployee)
			employee.DELETE(":id", h.employeeController.DeleteEmployee)
			employee.POST(":id/badges", h.employeeBadgesController.AssignEmployeeBadge)
			employee.GET(":id/badges", h.employeeBadgesController.RetrieveEmployeeBadges)
			employee.GET(":id/gifts", h.employeeGiftsController.RetrieveEmployeeGifts)
			employee.GET(":id/tasks", h.employeeTasksController.RetrieveEmployeeTasks)
		}
		unit := v1.Group("unit")
		{
			unit.GET("",
				dp.ApplyMiddleware(*log.NewLogger(), filteringRules(), nil),
				h.unitController.GetUnits)
			unit.POST("", h.unitController.CreateUnit)
			unit.GET(":id", h.unitController.RetrieveUnit)
			unit.PUT(":id", h.unitController.UpdateUnit)
			unit.DELETE(":id", h.unitController.DeleteUnit)
		}
		unitType := v1.Group("unit-type")
		{
			unitType.GET("",
				dp.ApplyMiddleware(*log.NewLogger(), filteringRules(), nil),
				h.unitTypeController.GetUnitTypes)
			unitType.POST("", h.unitTypeController.CreateUnitType)
			unitType.GET(":id", h.unitTypeController.RetrieveUnitType)
			unitType.PUT(":id", h.unitTypeController.UpdateUnitType)
			unitType.DELETE(":id", h.unitTypeController.DeleteUnitType)
		}
		event := v1.Group("event")
		{
			event.GET("",
				dp.ApplyMiddleware(*log.NewLogger(), filteringRules(), nil),
				h.eventController.GetEvents)
			event.POST("", h.eventController.CreateEvent)
			event.GET(":id", h.eventController.RetrieveEvent)
			event.PUT(":id", h.eventController.UpdateEvent)
			event.DELETE(":id", h.eventController.DeleteEvent)
		}
		badge := v1.Group("badge")
		{
			badge.GET("",
				dp.ApplyMiddleware(*log.NewLogger(), filteringRules(), nil),
				h.badgeController.GetBadges)
			badge.POST("", h.badgeController.CreateBadge)
			badge.GET(":id", h.badgeController.RetrieveBadge)
			badge.PUT(":id", h.badgeController.UpdateBadge)
			badge.DELETE(":id", h.badgeController.DeleteBadge)
		}
		gift := v1.Group("gift")
		{
			gift.GET("",
				dp.ApplyMiddleware(*log.NewLogger(), filteringRules(), nil),
				h.giftController.GetGifts)
			gift.POST("", h.giftController.CreateGift)
			gift.GET(":id", h.giftController.RetrieveGift)
			gift.PUT(":id", h.giftController.UpdateGift)
			gift.DELETE(":id", h.giftController.DeleteGift)
			gift.POST("buy", h.employeeGiftsController.BuyGift)
		}
		task := v1.Group("task")
		{
			task.GET("",
				dp.ApplyMiddleware(*log.NewLogger(), filteringRules(), nil),
				h.taskController.GetTasks)
			task.POST("", h.taskController.CreateTask)
			task.GET(":id", h.taskController.RetrieveTask)
			task.PUT(":id", h.taskController.UpdateTask)
			task.DELETE(":id", h.taskController.DeleteTask)
			task.POST("/start", h.employeeTasksController.StartEmployeeTask)
			task.PUT("/set-status", h.employeeTasksController.SetEmployeeTaskStatus)
		}
	}

	return router
}
