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
    unique: true,
  },

  isDelete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

export default mongoose.models.event || mongoose.model("event", eventSchema);
