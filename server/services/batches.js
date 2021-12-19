const mongoose = require("mongoose");
const Batch = require("../models/batchesModel");

module.exports = {
  create: async (name, dateFrom, dateTo, price, quantity) => {
    let newBatch = new Batch({
      _id: new mongoose.Types.ObjectId(),
      name,
      dateFrom,
      dateTo,
      price,
      quantity,
      isDelete: false,
    });
    await newBatch.save();
    return newBatch;
  },

  getById: async (batchId) => {
    const batch = await Batch.findById(batchId);
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
};
