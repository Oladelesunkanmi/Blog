package controller

import (
	"bold/database"
	"bold/model"
	"log"

	"github.com/gofiber/fiber/v2"
)

// Get list of blogs from the database
func BlogList(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "OK",
		"msg":        "Blog List",
	}

	db := database.DBConn
	var records []model.Blog

	db.Find(&records)
	context["blog_records"] = records

	c.Status(200)
	return c.JSON(context)
}

func BlogDetails(c *fiber.Ctx) error {
	id := c.Params("id")
	var record model.Blog

	database.DBConn.First(&record, id)
	context := fiber.Map{
		"statusText": "OK",
		"msg":        "Blog Details",
	}
	if record.ID == 0 {
		log.Println("Record not found")
		context["statusText"] = "ERROR"
		context["msg"] = "Record not found"
		c.Status(404)
		return c.JSON(context)
	}
	context["msg"] = "Blog Details"
	context["data"] = record

	c.Status(201)
	return c.JSON(context)
}

// Add a blog to the database
func BlogCreate(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "OK",
		"msg":        "Blog Created",
	}

	record := new(model.Blog)

	if err := c.BodyParser(record); err != nil {
		log.Println("Error in parsing records")
		context["statusText"] = "ERROR"
		context["msg"] = "Something went wrong"
		c.Status(400)
		return c.JSON(context)
	}

	result := database.DBConn.Create(record)
	if result.Error != nil {
		log.Println("Error in saving data")
		context["statusText"] = "ERROR"
		context["msg"] = "Failed to save record"
		c.Status(500)
		return c.JSON(context)
	}

	context["msg"] = "Record saved successfully"
	context["data"] = record

	c.Status(201)
	return c.JSON(context)
}

// Update a blog in the database
func BlogUpdate(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "OK",
		"msg":        "Blog Updated",
	}

	id := c.Params("id")
	var record model.Blog

	database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not found")
		context["statusText"] = "ERROR"
		context["msg"] = "Record not found"
		c.Status(404)
		return c.JSON(context)
	}

	if err := c.BodyParser(&record); err != nil {
		log.Println("Record not parsed")
		context["statusText"] = "ERROR"
		context["msg"] = "Invalid request body"
		c.Status(400)
		return c.JSON(context)
	}

	result := database.DBConn.Save(&record)
	if result.Error != nil {
		log.Println("Error updating record")
		context["statusText"] = "ERROR"
		context["msg"] = "Failed to update record"
		c.Status(500)
		return c.JSON(context)
	}

	context["msg"] = "Record updated successfully"
	context["data"] = record

	c.Status(200)
	return c.JSON(context)
}

// Delete a blog from the database
func BlogDelete(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "OK",
		"msg":        "Blog Deleted",
	}

	id := c.Params("id")
	var record model.Blog

	database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not found")
		context["statusText"] = "ERROR"
		context["msg"] = "Record not found"
		c.Status(404)
		return c.JSON(context)
	}

	result := database.DBConn.Delete(&record)
	if result.Error != nil {
		context["statusText"] = "ERROR"
		context["msg"] = "Something went wrong"
		c.Status(500)
		return c.JSON(context)
	}

	context["msg"] = "Record deleted successfully"
	c.Status(200)
	return c.JSON(context)
}
