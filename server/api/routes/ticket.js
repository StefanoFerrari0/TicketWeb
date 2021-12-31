const express = require("express");
const router = express.Router();
const TicketController = require("../../controllers/ticket");
const Middleware = require("../../middlewares/index");

//Create
router.post("/", TicketController.createTicket );

//getById
router.get("/:ticketId", TicketController.getTicketById );

//GetAll
router.get("/", Middleware.isRole('admin'), TicketController.getAllTickets);

//GetByUser
router.get("/get-by-user/:userId", TicketController.getUserTicket);

//Edit
router.put("/edit/:ticketId", Middleware.isRole('admin'), TicketController.editTicket);

//sendQrCodeByEmail
router.post("/send-qr-code/:ticketId", TicketController.sendQrCodeByEmail);

//Delete
router.put("/delete/:ticketId", TicketController.deleteTicket);

module.exports = router;