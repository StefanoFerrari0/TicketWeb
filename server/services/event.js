const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const Batch = require("../models/batchesModel");

module.exports = {
  create: async (name, date, batches) => {
    const batchesFound = await Batch.find({ name: { $in: batches } });
    let event = new Event({
      _id: new mongoose.Types.ObjectId(),
      name,
      date,
      isDelete: false,
      batches: batchesFound.map((batch) => batch._id),
    });
    await event.save();
    return event;
  },

  
  getById: async (eventId) => {
    const event = await Event.findById(eventId).populate("batches").exec();
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
