const TicketService = require("../services/ticket");
const EmailService = require("../services/email");
const createHttpError = require("http-errors");
const BatchService = require ("../services/batches");
const UserService = require("../services/user");

module.exports = {
  createTicket: async (req, res, next) => {
    console.log("createTicket");
    try {
      const {
        buyDate,
        price,
        email,
        phone,
        name,
        surname,
        dni,
        state,
        batches,
      } = req.body;

      const user = req.userLogged._id;
      const ticket = await TicketService.createTicket(
        buyDate,
        price,
        email,
        phone,
        name,
        surname,
        dni,
        state,
        user,
        batches
      );
      
      if(!ticket){
        const error = new createHttpError.BadRequest("No se creó el ticket.");
        return next(error);
      }
      
      const date = await BatchService.validateDate(ticket.buyDate, batches);

      if(!date){
        const error = new createHttpError.BadRequest("No se puede vender una entrada para esta tanda, ya que no cumple con la fechas establecidas");
        return next(error);
      }
	    
      const batchQuantity = await BatchService.subtractQuantity(batches);

      if (!batchQuantity)
      {
        const error = new createHttpError.BadRequest("No quedan más entradas para esta tanda.");
        return next(error);
      }

      const qr = await EmailService.createQr(ticket._id, ticket.dni, ticket.name, ticket.surname)
      
      /*       
      await EmailService.sendEmail(ticket.email, qr, "Tu entrada a las 10hs");
      */
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
        const error = new createHttpError.BadRequest("No se encontró el ticket.");
        return next(error);
      }

      const userLogged = req.userLogged;
      const auth = UserService.checkAuth(userLogged, ticket.user);

      if (!auth) {
        const error = new createHttpError.BadRequest("Necesita ser admin para acceder a la información de otro usuario.");
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
        const {buyDate, seller, price, email, phone, name, surname, dni, state, isPay, batches, user} = req.body;
        const ticketId = req.params.ticketId;
        
      const data = {
        buyDate,
        seller,
        price,
        email,
        phone,
        name,
        surname,
        dni,
        state,
        isPay,
        batches,
        user
      };
        const ticket = await TicketService.edit(ticketId, data);

        if(!ticket){
          const error = new createHttpError.BadRequest("No se modificó el ticket.");
          return next(error);
        }

        res.status(201).json({
          ok:true
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
  
  sendQrCodeByEmail: async (req, res, next) => {
    try{
      const ticketId = req.params.ticketId;
      const ticketInfo = await TicketService.getById(ticketId);
      
      if(!ticketInfo){
        const error = new createHttpError.BadRequest("No se encontró el ticket.");
        return next(error);
      }
      
      const qr = await EmailService.createQr(ticketId, ticketInfo.dni, ticketInfo.name, ticketInfo.surname);
      const subject = await EmailService.templateService(1, qr);
      await EmailService.sendEmail(ticketInfo.email, subject, "Tu entrada de las 10 hs");
      
      res.status(200).json({
        ok:true
      });
    } catch(error){
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
      const ticketFound = await TicketService.getById(ticketId);
      
      const ticket = await TicketService.delete(ticketId);
      
      if (!ticket) {
        const error = new createHttpError.BadRequest("No se borró el ticket.");
        return next(error);
      }
      
      const batch = ticketFound.batches;
      await BatchService.addQuantity(batch);

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
  
  getUserTicket:async (req, res, next) =>{
    console.log("getUserTicket");
    try {
      const userId = req.params.userId;

      const sellerTickets = await TicketService.getAllTicketsSelled(userId);

      if(!sellerTickets){
        let error = new createHttpError.BadRequest("Este usuario no vendió ningun ticket.");
        return next(error);
      }

      const auth = UserService.checkAuth(req.userLogged, userId);

       if (!auth) {
        let error = new createHttpError.BadRequest("Necesita ser admin para acceder a la información de otro usuario.");
        return next(error);
      }
      
      res.status(201).json({
        ok:true,
        data:sellerTickets
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
        }
			});
      next(httpError);
    }
  }

};
