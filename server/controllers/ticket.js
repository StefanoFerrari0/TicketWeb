const TicketService = require("../services/ticket");
const EmailService = require("../services/email");
const createHttpError = require("http-errors");
const crypt = require("../services/crypt");
const BatchService = require ("../services/batches")
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
        user,
        batches,
        qr
        
      } = req.body;

      const batchQuantity = req.params.batches;
      await BatchService.subtractQuantity(batchQuantity);
      if (!batchQuantity)
      {
        const error = new createHttpError.BadRequest("No quedan más tandas para el evento.");
        return next(error);
      }

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
        batches,
        qr
      );
       console.log(ticket);
      if(!ticket){
        const error = new createHttpError.BadRequest("No se creó el ticket.");
        return next(error);
      }
        const Id = toString(ticket._id);
        const hash = crypt.encrypt(Id);
        console.log(hash);

     // await EmailService.sendEmail(ticket._id, qr);

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
      const userLogged = req.userLogged;
      const userId = req.params.userId;
      const auth = UserService.checkAuth( userLogged, userId);

      if (auth == false) {
        const error = new createHttpError.BadRequest("Necesita ser admin para acceder a la informacion.");
        return next(error);
      }

      const ticketId = req.params.ticketId;
      const ticket = await TicketService.getById(ticketId);

      if (!ticket) {
        const error = new createHttpError.BadRequest("No se encontró el ticket.");
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
      const userLogged = req.userLogged;
      const userId = req.params.userId;
      const auth = UserService.checkAuth( userLogged, userId);

      if (auth == false) {
        const error = new createHttpError.BadRequest("Necesita ser admin para acceder a la informacion.");
        return next(error);
      }

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
      const userLogged = req.userLogged;
      const userId = req.params.userId;
      const auth = UserService.checkAuth( userLogged, userId);

      if (auth == false) {
        const error = new createHttpError.BadRequest("Necesita ser admin para acceder a la informacion.");
        return next(error);
      }

        const {buyDate, seller, price, email, phone, name, lastName, dni, state, qr, batches, user} = req.body;
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
      
      const qr = await EmailService.createQr(ticketId, ticketInfo.dni, ticketInfo.name, ticketInfo.lastName);
      
      await EmailService.sendEmail(ticketInfo.email, qr);
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
      const ticket = await TicketService.delete(ticketId);
      
      if (!ticket) {
        const error = new createHttpError.BadRequest("No se borró el ticket.");
        return next(error);
      }
      
      const batch = ticketId.batches;
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

  makeQrCode: async (req,res,next)=> {
    try{
      const ticketId = req.params.ticketId;
      const ticket = await TicketService.getById(ticketId);
      if (!ticket) {
        const error = new createHttpError.BadRequest("No se encontro el ticket.");
        return next(error);
      }
      

      let qr = await TicketService.createQr(id, dni, name, lastName)
      const data={qr};
      await TicketService.edit(ticketId,data);
      
      res.status(200).json({
        ok: true,
        
      });
    }
    catch{
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  UserTicket:async (req, res, next) =>{

    try {

      const ticket = await TicketService.getAll();
      const name = req.params.name;
      const sellerTickets = await TicketService.getAllTicketsSelled(name, ticket);

      if(!sellerTickets){
        const error = new createHttpError.BadRequest("Este usuario no vendio ningun ticket.");
          return next(error);
      }
      
      res.status(201).json({
        ok:true
      });
    } catch{
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  }

};
