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
    unique: false
  },

  location: {
    type: String,
    required: true
  },

  isDelete: {
    type: Boolean,
    default: false,
    required: true,
  },
  
});

module.exports = mongoose.model("Event", eventSchema);
