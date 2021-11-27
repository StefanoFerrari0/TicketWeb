const mongoose = require("mongoose");
const Batch = require("../models/batchesModel");
const Event = require("../models/eventModel");
const Ticket = require("../models/ticketModel");

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

    newTicket.email.trim();
    await newTicket.save();
    return newTicket;
  },

  getById: async (ticketId) => {
    const ticket = await Ticket.findById(ticketId);
    return ticket;
  },

  getAll: async () => {
    const tickets = await Ticket.find({ isDeleted: false });
    return tickets;
  },

  delete: async (ticketId) => {
    const ticket = await Ticket.findByIdAndUpdate(ticketId, {
      isDeleted: true,
    });
    return ticket;
  },
  
  edit: async (data) => {
    const ticket = await Ticket.findByIdAndUpdate(data._id, data);
    return ticket;
  },
};
