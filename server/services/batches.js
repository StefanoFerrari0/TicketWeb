const mongoose = require("mongoose");
const Batch = require("../models/batchesModel");
const Event = require("../models/eventModel");

module.exports = {
  create: async (name, dateFrom, dateTo, price, quantity,event) => {
    const eventFound = await Event.find({ _id: { $in: event } });
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
    if(newBatch.quantity <= 0 || newBatch.price < 0)
    {
      return false;
    }
    await newBatch.save();
    return newBatch;
  },

  getById: async (batchId) => {
    let batch = await Batch.findById(batchId).populate("event").exec();
    if(batch.isDelete == true)
    {batch = false;}
    return batch;
  },

  getAll: async () => {
    const batch = await Batch.find({ isDelete: false });
    return batch;
  },

  delete: async (batchId) => {
    console.log(batchId);
    const batch = await Batch.findByIdAndUpdate(batchId, { isDelete: true });
    return batch;
  },

  edit: async (batchId, data) => {
    const batch = await Batch.findByIdAndUpdate(batchId, data);
    return batch;
  },

  subtractQuantity: async (batchId)=>{
    let batch = await Batch.findById(batchId);
    console.log(batch.quantity);
    if (batch.quantity < 1){
      return false;
    }
    else{
      await Batch.findByIdAndUpdate(batch, {quantity: batch.quantity-1});
    }
    return batch;
  },

  addQuantity: async (batchId)=>{
    const batch = await Batch.findById(batchId)
    
    const addedBatch = await Batch.findByIdAndUpdate(batch, {quantity: batch.quantity+1});
    return addedBatch;
  },

  getByEvent: async(event)=>{
    const batch = await Batch.find({
      event:event,
      isDelete: false,
    }).populate("event");
    return batch;
  }
};
