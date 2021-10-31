var mongoose = requiere ("mongoose")
var Ticket = require("../models/ticketModel")
var Event = require("../models/eventModel")
var batch = require("../models/batchesModel")
module.exports={

    createTicket: async(req,res,next)=>{
        
        const {buyDate,seller,price,email,phone,name,LastName,dni,state,batches}=req.body;
        
        const batchesFound = await batch.find({})
        
        
        const ticket = new Ticket ({
            _id: new mongoose.Types.ObjectId(),
        });
    },
}