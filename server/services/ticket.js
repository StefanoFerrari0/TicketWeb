const mongoose = require("mongoose");
const Batch = require("../models/batchesModel");
const Event = require("../models/eventModel");
const Ticket = require("../models/ticketModel");
const QR = require("qrcode");

module.exports = {
  createTicket: async (
    buyDate,
    seller,
    price,
    email,
    phone,
    name,
    lastName,
    dni,
    batches,
    events,
    qr
  ) => {
    const batchesFound = await Batch.find({ name: { $in: batches } });
    const eventsFound = await Event.find({ name: { $in: events } });


    let newTicket = new Ticket({
      _id: new mongoose.Types.ObjectId(),
      buyDate,
      seller,
      price,
      email,
      phone,
      name,
      lastName,
      dni,
      qr,
      state: true,
      batches: batchesFound.map((batches) => batches._id),
      events: eventsFound.map((events) => events._id),
      isDeleted: false,
    });
    console.log(newTicket._id);
    newTicket.email.trim();
    await newTicket.save();
    return newTicket;
  },

  getById: async (ticketId) => {
    const ticket = await Ticket.findById(ticketId).populate('batch','event').exec();
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
    const ticket = await Ticket.findByIdAndUpdate(ticketId, {
      isDeleted: true,
    });
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
};
