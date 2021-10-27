const mongoose = require("mongoose");
const Batch = require("./batchesModel");

const ticketSchema = new mongoose.Schema(
  {
    buyDate: {
      type: Date,
      required: true,
    },

    seller: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: Number,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    dni: {
      type: String,
      required: true,
      trim: true,
    },

    qr: {
      type: String,
      required: true,
      trim: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
      required: false,
    },
    state: {
      type: Boolean,
      required: true,
      default: false,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
