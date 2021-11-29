const express = require("express");
const router = express.Router();
const EventController = require("../../controllers/event");
const Middleware = require("../../middlewares/index");

//Create
router.post("/", Middleware.isRole("admin"), EventController.createEvent);

//GetById
router.get("/:eventId", EventController.getEventId);

//GetAll
router.get("/", EventController.getAllEvents);

//Edit
router.put("/edit/:eventId", Middleware.isRole("admin"), EventController.editEvent);

//Delete
router.put("/delete/:eventId", Middleware.isRole("admin"), EventController.deleteEvent);

module.exports = router;