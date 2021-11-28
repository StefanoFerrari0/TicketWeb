const express = require("express");
const router = express.Router();
const EventController = require("../../controllers/event");

//Create
router.post("/", EventController.createEvent);

//GetById
router.get("/:eventId", EventController.getEventId);

//GetAll
router.get("/", EventController.getAllEvents);

//Edit FALTA


//Delete
router.put("/delete/:eventId", EventController.deleteEvent);


module.exports = router;
