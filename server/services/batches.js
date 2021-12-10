const mongoose = require("mongoose");
const Batch = require("../models/batchesModel");
const Event = require("../models/eventModel");

module.exports = {
  create: async (name, dateFrom, dateTo, price, quantity,event) => {
    const eventFound = await Event.find({ name: { $in: event } });
    let newBatch = new Batch({
      _id: new mongoose.Types.ObjectId(),
      name,
      dateFrom,
      dateTo,
      price,
      quantity,
      event: eventFound.map((event) => event._id),
      isDelete: false,
    });
    await newBatch.save();
    return newBatch;
  },

  getById: async (batchId) => {
    const batch = await Batch.findById(batchId).populate("event").exec();
    return batch;
  },

  getAll: async () => {
    const batch = await Batch.find({ isDelete: false });
    return batch;
  },

  delete: async (batchId) => {
    const batch = await Batch.findByIdAndUpdate(batchId, { isDelete: true });
    return batch;
  },

  edit: async (batchId, data) => {
    const batch = await Batch.findByIdAndUpdate(batchId, data);
    return batch;
  },

  subtractQuantity: async (batchId)=>{
    const batch = await Batch.findById(batchId);
    if (batch.quantity==0)
    {return null;}
    else{
      await batch.findByIdAndUpdate(batch,{quantity:quantity-1});
    }
    return batch;
  },

  addQuantity: async (batchId)=>{
    const batch = await Batch.findByIdAndUpdate(batchId,{quantity:quantity+1});
    return batch;
  },

  getByEvent: async(name)=>{
    const batch = await Batch.findOne({
      name,
      isDelete: false,
    }).populate("Batch");
    return batch;
  }
};
