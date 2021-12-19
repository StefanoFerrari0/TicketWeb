const mongoose = require("mongoose");
const Event = require("../models/eventModel");


module.exports = {
  create: async (name, date, location) => {
    
    let event = new Event({
      _id: new mongoose.Types.ObjectId(),
      name,
      date,
      location,
      isDelete: false,
    });
    //falta validar el no crear evento con una fecha menor a la actual
    await event.save();
    return event;
  },

  
  getById: async (eventId) => {
    const event = await Event.findOne({_id: eventId, isDelete: false});
    return event;
  },
  
  getAll: async () => {
    const events = await Event.find({ isDelete: false });
    return events;
  },

  getByName: async (name) => {
    const event = await Event.findOne({
      name,
      isDelete: false,
    }).populate("Event");

    return event;
  },
  
  edit: async (eventId, data) => {
    const event = await Event.findByIdAndUpdate(eventId, data);
    return event;
  },

  delete: async (eventId) => {
    const event = await Event.findByIdAndUpdate(eventId, { isDelete: true });
    return event;
  },
};
