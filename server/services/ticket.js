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
      isPay: false,
      user,
      batches,
      isDeleted: false,

    });

    await newTicket.save();
    return newTicket;
  },

  getById: async (ticketId) => {
    const ticket = await Ticket.findOne({ _id: ticketId, isDelete: false })
      .populate({
        path: "user",
        model: "User",
      })
      .populate({
        path: "batches",
        model: "Batches",
        populate: {
          path: "event",
          model: "Event",
        },
      })
      .exec();
    return ticket;
  },

  getAll: async () => {
    const tickets = await Ticket.find({ isDelete: false })
      .populate({
        path: "user",
        model: "User",
      })
      .populate({
        path: "batches",
        model: "Batches",
        populate: {
          path: "event",
          model: "Event",
        },
      })
      .exec();
    return tickets;
  },

  edit: async (ticketId, data) => {
    const ticket = await Ticket.findByIdAndUpdate(ticketId, data);
    return ticket;
  },

  delete: async (ticketId) => {
    const ticket = await Ticket.findByIdAndUpdate(ticketId, { isDelete: true });
    return ticket;
  },

  getAllTicketsSelled: async (userId) => {
    const ticket = await Ticket.find({ user: userId, isDelete: false });
    return ticket;
  },
};
