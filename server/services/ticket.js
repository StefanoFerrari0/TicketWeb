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
    const batchesFound = await Batch.find({ _id: { $in: batches } });
    const userFound = await User.find({_id:{$in: user}});

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
      batches: batchesFound.map((batches) => batches._id),
      isDeleted: false,
    });
    newTicket.email.trim();
    await newTicket.save();
    return newTicket;
  },
  
  // let results = await OrderModel.find().populate([{path: 'user', select: 'firstname'}, {path: 'meal', select: 'name'}]);
  getById: async (ticketId) => {
    let ticket = await Ticket.findById(ticketId,{isDelete: false}).populate("batches").exec();
    if (ticket.isDelete == true){
      ticket=false;
    }
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

  getAllTicketsSelled:async(user)=>{
    const ticket = await Ticket.find({user: user, isDeleted: true});
    return ticket;
  },
};
