var express = require("express");
var router = express.Router();
var EventController = require("../../controllers/event");
const Middlewares = require("../../middlewares/index")
//GetById
router.get("/:eventtId", EventController.getEventId );

//GetAll
router.get("/", EventController.getAllEvents );
  
//Delete
router.delete("/:eventId",Middlewares.isRole("admin"), EventController.deleteEvent);
  

//Edit
router.put("/:eventId", EventController.editEvent );
  
//Add
router.post("/", EventController.createEvent );
  