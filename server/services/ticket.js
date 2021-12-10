const mongoose = require("mongoose");
const Batch = require("../models/batchesModel");
const Event = require("../models/eventModel");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
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
    state,
    user,
    batches,
    qr
  ) => {
    const batchesFound = await Batch.find({ name: { $in: batches } });
    const userFound = await User.find({name:{$in: user}});

    let newTicket = new Ticket({
      _id: new mongoose.Types.ObjectId(),
      buyDate,
      price,
      email,
      phone,
      name,
      surname,
      dni,
      qr,
      state: true,
      user: userFound.map((user)=>user._id),
      batches: batchesFound.map((batch) => batch._id),
      isDeleted: false,
    });
    newTicket.email.trim();
    await newTicket.save();
    return newTicket;
  },
  
  // let results = await OrderModel.find().populate([{path: 'user', select: 'firstname'}, {path: 'meal', select: 'name'}]);
  getById: async (ticketId) => {
    const ticket = await Ticket.findById(ticketId).populate([{path: "user", select:'user'}, {path: "batches",select:'batches'}]).exec();
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

  createQr: async (id, dni, name, lastName)=>{
    let qrCode = {
      id,
      dni,
      name,
      lastName  
    }; 
    
    let stringQrCode = JSON.stringify(qrCode);
    
    QR.toDataURL(stringQrCode,(error,src)=>
    {
      if(error) return(error);
      console.log(stringQrCode)
    });

    return stringQrCode;
  },

  getAllTicketsSelled:async(name, ticket)=>{
    /*const TicketSelled;
    ticket.forEach(ticket => {
      if(ticket.name === name)
      {
        TicketSelled = ticket;
      }
    });

    return TicketSelled;*/
  },
};
