const mongoose = require("mongoose");
const Batch = require("../models/batchesModel");
const Event = require("../models/eventModel");

module.exports = {
  create: async (name, dateFrom, dateTo, price, quantity,event) => {
    
    let newBatch = new Batch({
      _id: new mongoose.Types.ObjectId(),
      name,
      dateFrom,
      dateTo,
      price,
      quantity,
      event,
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
    const batch = await Batch.findOne({_id: batchId , isDelete: false}).populate('event').exec();
    return batch;
  },

  getAllByEvents: async (batchId) => {
    const batch = await Batch.find({ event: false });
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
    let batch = await Batch.findById(batchId);
    
    if (batch.quantity < 1){
      return false;
    }
    else{
      await Batch.findByIdAndUpdate(batch, {quantity: batch.quantity-1});
    }
    return batch;
  },

  addQuantity: async (batchId)=>{
    
    const addedBatch = await Batch.findByIdAndUpdate(batchId, {quantity: batchId.quantity+1});
    return addedBatch;
  },

  getByEvent: async(eventId)=>{
    const batch = await Batch.find({
      event:eventId,
      isDelete: false,
    });
    return batch;
  }
};
