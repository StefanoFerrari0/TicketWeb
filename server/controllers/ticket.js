const ticketService = require("../services/ticket");
const emailService = require("../services/email");
module.exports={

    createTicket:async(req,res,next)=>{
       console.log("createTickeck");
       try {
           const{buyDate,seller,price,email,phone,name,lastName,dni,state,qr}= req.body;
           const ticket = ticketService.createTicket(buyDate,seller,price,email,phone,name,lastName,dni,state,qr);
           /*const emailFound= emailService.sendEmail(ticket._id,email);*/
           res.status(201).json({
               ok:true,
               ticket
           });
       } catch (error) {
           next(error);
       }
    },

    getTicketById:async(req,res,next)=>{
        console.log("getTicketId");
        try {
            const ticketId = req.params.ticketId;
            const ticket =await ticketService.getById(ticketId);

            if(!ticket){
                return next(new Error("No se encontro el ticket."));
            }
            res.status(201).json({
                ok:true,
                ticket,
            });
        } catch (error) {
            next(error);
        }
    },

    getAllTickets:async(req,res,next)=>{
        try {
            const ticket = await ticketService.getAll();
            res.status(201).json({ok:true,ticket});
            if(!ticket){
                return next(new Error("No existen tickets"));
            }
        } catch (error) {
            next(error);
        }
    },

    editTicket:async(req,res,next)=>{
        try {
            const ticketId= req.params.ticketId;
            const ticket = await ticketService.edit(ticketId);

            if(!ticket){
                return next(new Error("No existe el ticket"));
            }
        } catch (error) {
          next(error);
        }
    },
    deleteTicket:async(req,res,next)=>{
        try {
            const ticketId=req.params.ticketId;
            const ticket = await ticketService.delete(ticketId);
            if(!ticket){
                return next(new Error("no existe el ticket"));
            }

            res.status(204).json({ok:true,ticket});
        } catch (error) {
            next(error);
        }
    },

};