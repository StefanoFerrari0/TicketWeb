const mongoose = require("mongoose");
const Event = require("../models/eventModel");


module.exports = {
  create: async (name, date, location, active) => {
    
    let event = new Event({
      _id: new mongoose.Types.ObjectId(),
      name,
      date,
      location,
      active,
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
  
  getAllActives: async ()=>{
      const events = await Event.find({active:true, isDelete: false});
      return events;
  },

  getAll: async () => {
    const events = await Event.find({ isDelete: false });
    return events;
  },

  getEventLocation: async (eventId)=>{
    const event = await Event.findOne({_id: eventId, isDelete: false});
    return event;
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
