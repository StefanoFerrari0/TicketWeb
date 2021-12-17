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
    /*const dateNow = new Date();
    console.log(dateNow);
    if(date >= dateNow){
      console.log("xd");
      return false;
    }*/
    await event.save();
    return event;
  },

  
  getById: async (eventId) => {
    const event = await Event.findById({_id: eventId, isDeleted: false});
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
