var mongoose = require ("mongoose")
var Batch = require("../models/batchesModel")
var Event = require("../models/eventModel")
var Ticket =require("../models/ticketModel")
module.exports={

    createTicket: async(buyDate,seller,price,email,phone,name,lastName,dni,state)=>{
        
        const {buyDate,seller,price,email,phone,name,lastName,dni,state,}
        
        const batchesFound = await Batch.find({name:$batches})
        const eventsFound = await Event.find({name:$events})
        
        
        let newTicket = new Ticket ({
            _id: new mongoose.Types.ObjectId(),
            buyDate,
            seller,
            price,
            email,
            phone,
            name,
            lastName,
            dni,
            state:true,
            batches:batchesFound.map((batches)=>batches._id),
            events:eventsFound.map((events)=>events._id),
            isDeleted:false
        });
        await newTickect.save();
        return newTicket;
    },

    getById:async(ticketId)=>{
        const ticket = await Ticket.findById(ticketId);
        return ticket;
    },

    getAll:async()=>{
        const tickets = await Ticket.find({isDeleted:false});
        return tickets;
    },
    delete: async(ticketId)=>{
        const ticket = await Ticket.findByIdAndUpdate(ticketId,{isDeleted:true});
        return ticket;
    },
    edit: async(data)=>{
        const ticket = await Ticket.findByIdAndUpdate(data._id,data);
        return ticket;
    },
}