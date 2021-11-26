var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Ticket = require("../../models/ticketModel");
var ticketController = require("../../controllers/ticket")
//getById
router.get("/:ticketId",ticketController.getTicketById );

//GetAll
router.get("/",ticketController.getAllTickets);

//Delete
router.put("/delete/:ticketId",ticketController.deleteTicket);

//Update
router.put("/edit/:ticketId",ticketController.editTicket);

//Create
router.post("/",ticketController.createTicket );

module.exports = router;
