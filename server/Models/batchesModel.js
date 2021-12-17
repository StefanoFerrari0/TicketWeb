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
    default: Date.now()
  },

  dateTo: {
    type: Date,
    required: true,
    
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
  event:{
    type: mongoose.Types.ObjectId,
    ref: "Event",
  },
  
});

module.exports = mongoose.model("Batches", batchesSchema);
