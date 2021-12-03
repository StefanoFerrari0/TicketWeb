const express = require("express");
const router = express.Router();
const TicketController = require("../../controllers/ticket")
const Middleware = require("../../middlewares/index");

//Create
router.post("/", TicketController.createTicket );

//getById
router.get("/:ticketId", TicketController.getTicketById );

//GetAll
router.get("/", Middleware.isRole("admin"), TicketController.getAllTickets);

//Edit
router.put("/edit/:ticketId", TicketController.editTicket);
//QR
router.post("/edit/QrCode/:ticketId", TicketController.makeQrCode);
//Delete
router.put("/delete/:ticketId", TicketController.deleteTicket);

module.exports = router;