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

  getAll: async () => {
    const events = await Event.find({ isDelete: false });
    return events;
  },

  getById: async (eventId) => {
    const event = await Event.findById(eventId);
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
