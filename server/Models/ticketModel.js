const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    buyDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    surname: {
      type: String,
      required: true,
      trim: true,
    },

    dni: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: Boolean,
      required: true,
      default: false,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    batches: {
      type: mongoose.Types.ObjectId,
      ref: "Batches",
      required: true,
    },

    isDelete: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
