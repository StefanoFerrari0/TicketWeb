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
    batches,
    lastUserEdit
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
      isPay: false,
      user,
      batches,
      lastUserEdit,
      isDeleted: false,

    });
    
    await newTicket.save();
    return newTicket;
  },
  
  
  getById: async (ticketId) => {
    const ticket = await Ticket.findOne({_id: ticketId, isDelete: false}).populate('batches').exec();
    return ticket;
  },

  getAll: async () => {
    const tickets = await Ticket.find({ isDelete: false });
    return tickets;
  },

  edit: async (ticketId, data) => {
    const ticket = await Ticket.findByIdAndUpdate(ticketId, data, {lastUserEdit: data.lastUserEdit});
    return ticket;
  },

  editState: async (ticketId) =>{
    const ticket = await Ticket.findByIdAndUpdate(ticketId, { state: false } );
    return ticket;
  },

  delete: async (ticketId, lastUserEdit) => {
    const ticket = await Ticket.findByIdAndUpdate(ticketId, {  isDelete: true, lastUserEdit: lastUserEdit });
    return ticket;
   },

  getAllTicketsSelled:async(userId)=>{
    const ticket = await Ticket.find({user: userId, isDelete: false});
    return ticket;
  },
};
