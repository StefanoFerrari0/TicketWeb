var mongoose = require("mongoose");
var Batch = require("../models/batchesModel");
const { findOne } = require("../models/eventModel");
var Event = require("../models/eventModel")
module.exports = {
  
  create : async (name, dateFrom, dateTo,price,quantity)=>{
      
        
        let newbatch = new  Batch({
          _id: new mongoose.Types.ObjectId(),
          name,
          dateFrom,
          dateTo,
          price,
          quantity,
          isDelete:false,
        });
        await newbatch.save();
        return newbatch;
  },
  
  
  getById: async (batchId) => {
        const batch = await Batch.findById(batchId);
        return batch;
  },

  getAll: async () => {
    
      const batch = await Batch.find({isDelete:false});
      console.log("batches")
      return batch;
    
  },

  delete: async (batchId) => {
      const batch = await Batch.findByIdAndUpdate(batchId,{isDelete:true});
      return batch;
  },

  edit: async (data) => {
    const batch = await Batch.findByIdAndUpdate(data._id,data);
    return batch;
  },
};