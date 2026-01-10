package controller

import (
	"bold/database"
	"bold/model"
	"log"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(c *fiber.Ctx) error {
	var req LoginRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "ERROR",
			"msg":        "Invalid request body",
		})
	}

	var user model.User
	result := database.DBConn.Where("email = ?", req.Email).First(&user)
	if result.Error != nil {
		log.Println("User not found:", result.Error)
		return c.Status(404).JSON(fiber.Map{
			"statusText": "ERROR",
			"msg":        "User not found",
		})
	}

	// Compare password with hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		// Password mismatch
		return c.Status(401).JSON(fiber.Map{
			"statusText": "ERROR",
			"msg":        "Incorrect password",
		})
	}

	// Hide password before sending response
	user.Password = ""

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Login successful",
		"data":       user,
	})
}
