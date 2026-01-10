package router

import (
	"bold/controller"

	"github.com/gofiber/fiber/v2"
)

// SetUpRoutes sets up the application routes
func SetUpRoutes(app *fiber.App) {
	// Define your routes here
	app.Get("/", controller.BlogList)
	app.Get("/:id", controller.BlogDetails)
	app.Post("/", controller.BlogCreate)
	app.Put("/:id", controller.BlogUpdate)
	app.Delete("/:id", controller.BlogDelete)
	app.Post("/login", controller.Login)
}
