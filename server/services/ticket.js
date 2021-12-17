const mongoose = require("mongoose");
const Ticket = require("../models/ticketModel");
const QR = require("qrcode");


module.exports = {
  createTicket: async (
    buyDate,
    price,
    email,
    phone,
    name,
    surname,
    dni,
    user,
    batches
  ) => {
    
    let newTicket = new Ticket({
      _id: new mongoose.Types.ObjectId(),
      buyDate,
      price,
      email,
      phone,
      name,
      surname,
      dni,
      state: true,
      user,
      batches,
      isDeleted: false,
    });
    
    await newTicket.save();
    return newTicket;
  },
  
  
  getById: async (ticketId) => {
    const ticket = await Ticket.findById({_id: ticketId, isDeleted: false}).populate('batches').exec();
    return ticket;
  },

  getAll: async () => {
    const tickets = await Ticket.find({ isDeleted: false });
    return tickets;
  },

  edit: async (ticketId, data) => {
    const ticket = await Ticket.findByIdAndUpdate(ticketId, data);
    return ticket;
  },

  delete: async (ticketId) => {
    const ticket = await Ticket.findByIdAndUpdate(ticketId, {  isDeleted: true, });
    return ticket;
   },

  getAllTicketsSelled:async(userId)=>{
    const ticket = await Ticket.find({user: userId, isDeleted: false});
    return ticket;
  },
};
