const TicketService = require("../services/ticket");
const EmailService = require("../services/email");
const createHttpError = require("http-errors");
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
      
      
      const emailFound= EmailService.sendEmail(email);
      if(!ticket){
        const error = new createHttpError.BadRequest("No se creo el ticket.");
        return next(error);
      }
      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  getTicketById: async (req, res, next) => {
    console.log("getTicketById");
    try {
      const ticketId = req.params.ticketId;
      const ticket = await TicketService.getById(ticketId);

      if (!ticket) {
        const error = new createHttpError.BadRequest("No se encontro el ticket.");
        return next(error);
      }

      res.status(200).json({
        ok: true,
        data: ticket,
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  getAllTickets: async (req, res, next) => {
    console.log("getAllTickets")
    try {
      const ticket = await TicketService.getAll();

      if (!ticket) {
        const error = new createHttpError.BadRequest("No existen tickets.");
        return next(error);
      }

      res.status(200).json({
        ok: true, 
        data: ticket 
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  editTicket: async (req, res, next) => {
    console.log("editTicket")  
      try {
        const {buyDate,seller,price,email,phone,name,lastName,dni,state,qr} = req.body;
        const ticketId = req.params.ticketId;
        
      const data = {
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
      };
        const ticket = await TicketService.edit(ticketId,data);
        if(!ticket){
          const error = new createHttpError.BadRequest("No se modifico el ticket.");
          return next(error);
        }
        res.status(201).json({ok:true});
      } catch (error) {
        const httpError = createHttpError(500, error, {
          headers: {
            "X-Custom-Header": "Value",
          }
        });
        next(httpError);
      }
  },
  
  deleteTicket: async (req, res, next) => {
    console.log("deleteTicket");
    try {
      const ticketId = req.params.ticketId;
      const ticket = await TicketService.delete(ticketId);

      if (!ticket) {
        const error = new createHttpError.BadRequest("No se borro el ticket.");
        return next(error);
      }

      res.status(200).json({ 
        ok: true, 
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },
};
