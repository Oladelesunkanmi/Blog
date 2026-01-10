package main

import (
	"bold/database"
	"bold/router"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func init() {

	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error in loading .env file.")
	}
	database.ConnectDB()
}

func main() {

	sqlDb, err := database.DBConn.DB()
	if err != nil {
		panic("Error in sql DB connection")
	}
	defer sqlDb.Close()

	app := fiber.New()

	app.Static("/static", "./static")
	app.Use(cors.New(cors.Config{
		AllowOrigins: "",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Use(logger.New())
	router.SetUpRoutes(app)
	app.Listen(":8000")
}
