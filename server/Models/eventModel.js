const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  date: {
    type: Date,
    required: true,
    unique: false,
  },

  isDelete: {
    type: Boolean,
    default: false,
    required: true,
  },
  batches: {
    type: mongoose.Types.ObjectId,
    ref: "Batches",
  },
});

module.exports = mongoose.model("Event", eventSchema);
