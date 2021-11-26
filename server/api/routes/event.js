var express = require("express");
var router = express.Router();
var EventController = require("../../controllers/event");
const Middlewares = require("../../middlewares/index")
//GetById
router.get("/:eventId", EventController.getEventId );

//GetAll
router.get("/", EventController.getAllEvents );
  
//Delete
router.put("/delete/:eventId", EventController.deleteEvent);
  

//Edit
router.put("/edit/:eventId", EventController.editEvent );
  
//Add
router.post("/", EventController.createEvent );

module.exports = router;