const mongoose = require("mongoose");
const Event = require("./eventModel");

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

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },

  isDelete: {
    type: Boolean,
    default: true,
    required: false,
  },

  quantity: {
    type: Number,
    required: false,
  },
});

export default mongoose.models.user || mongoose.model("batches", batchesSchema);
