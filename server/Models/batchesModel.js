const mongoose = require("mongoose");

const batchesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  dateFrom: {
    type: Date,
    required: true,
    unique: true,
  },

  dateTo: {
    type: Date,
    required: true,
    unique: true,
  },

  price: {
    type: Number,
    required: true,
  },

  
  isDelete: {
    type: Boolean,
    default: false,
    required: true,
  },

  quantity: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Batches", batchesSchema);
