const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    buyDate: {
      type: Date,
      required: true,
      default: Date.now
    },

    email: {
      type:String,
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
    
    isDelete: {
      type: Boolean,
      default: false,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPay:{
      type: Boolean,
      default:false
    },
    user:
      {
      type:mongoose.Types.ObjectId,
      ref:"User"
      },
    batches:
      {
      type:mongoose.Types.ObjectId,
      ref:"Batches"
      },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
