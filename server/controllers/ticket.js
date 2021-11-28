const TicketService = require("../services/ticket");
const EmailService = require("../services/email");

module.exports = {
  createTicket: async (req, res, next) => {
    console.log("createTicket");
    try {
      const {
        buyDate,
        seller,
        price,
        email,
        phone,
        name,
        lastName,
        dni,
        state,
        qr,
      } = req.body;

      const ticket = TicketService.createTicket(
        buyDate,
        seller,
        price,
        email,
        phone,
        name,
        lastName,
        dni,
        state,
        qr
      );

      /*const emailFound= EmailService.sendEmail(ticket._id,email);*/

      res.status(200).json({
        ok: true,
        ticket,
      });
    } catch (error) {
      next(error);
    }
  },

  getTicketById: async (req, res, next) => {
    console.log("getTicketById");
    try {
      const ticketId = req.params.ticketId;
      const ticket = await TicketService.getById(ticketId);

      if (!ticket) {
        return next(new Error("No se encontro el ticket."));
      }

      res.status(200).json({
        ok: true,
        ticket,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllTickets: async (req, res, next) => {
    try {
      const ticket = await TicketService.getAll();

      if (!ticket) {
        return next(new Error("No existen tickets"));
      }

      res.status(200).json({
        ok: true, 
        ticket 
      });
    } catch (error) {
      next(error);
    }
  },

  editTicket: async (req, res, next) => {
/*     try {
      const ticketId = req.params.ticketId;
      const ticket = await TicketService.edit(ticketId);

      if (!ticket) {
        return next(new Error("No existe el ticket"));
      }

      res.status(201).json({ 
        ok: true, 
        ticket 
      });
    } catch (error) {
      next(error);
    } */
  },
  
  deleteTicket: async (req, res, next) => {
    console.log("deleteTicket");
    try {
      const ticketId = req.params.ticketId;
      const ticket = await TicketService.delete(ticketId);

      if (!ticket) {
        return next(new Error("No existe el ticket"));
      }

      res.status(200).json({ 
        ok: true, 
        ticket
      });
    } catch (error) {
      next(error);
    }
  },
};
