package controller

import (
	"bold/database"
	"bold/model"
	"log"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func CreateUser(c *fiber.Ctx) error {
	var req RegisterRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "ERROR",
			"msg":        "Invalid request body",
		})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "ERROR",
			"msg":        "Failed to hash password",
		})
	}

	user := model.User{
		Email:    req.Email,
		Password: string(hashedPassword),
	}
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "ERROR",
			"msg":        "Failed to hash password",
		})
	}

	result := database.DBConn.Create(&user)
	if result.Error != nil {
		log.Println(result.Error)
		return c.Status(500).JSON(fiber.Map{
			"statusText": "ERROR",
			"msg":        "Failed to create user",
		})
	}

	user.Password = ""
	return c.Status(201).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "User created successfully",
		"data":       user,
	})
}

func GetUserByEmail(c *fiber.Ctx) error {
	email := c.Params("email")
	var record model.User

	result := database.DBConn.Where("email = ?", email).First(&record)

	context := fiber.Map{
		"statusText": "OK",
		"msg":        "User fetched successfully",
	}

	if result.Error != nil {
		log.Println("Record not found")
		context["statusText"] = "ERROR"
		context["msg"] = "Record not found"
		return c.Status(404).JSON(context)
	}

	record.Password = "" // hide password
	context["data"] = record

	return c.Status(200).JSON(context)
}

func GetUserByID(c *fiber.Ctx) error {

	id := c.Params("id")
	var record model.User

	result := database.DBConn.First(&record, id)

	context := fiber.Map{
		"statusText": "OK",
		"msg":        "User fetched successfully",
	}

	if result.Error != nil {
		log.Println("Record not found")
		context["statusText"] = "ERROR"
		context["msg"] = "Record not found"
		return c.Status(404).JSON(context)
	}

	record.Password = "" // hide password
	context["data"] = record

	return c.Status(200).JSON(context)
}
