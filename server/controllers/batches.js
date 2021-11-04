var mongoose = require("mongoose");
var Batch = require("../models/batchesModel");
const { findOne } = require("../models/eventModel");
var Event = require("../models/eventModel")
var batchService = require("../services/batches")
module.exports = {
  
  createBatch : async (req,res,next)=>{
    console.log("createBranch")  ;
    try {
        const {name, dateFrom, dateTo,price,events,quantity} = req.body;
        
        batchService.create(name, dateFrom, dateTo,price,events,quantity);
        res.status(201).json({
          ok:true,
        });
      } catch (error) {
        next(error);  
      }
  },
  
  
  getBatchById: async (req,res,next) => {
    console.log("getUserId");
    try {
      const batchId =req.params.batchId;
      const batch = await batchService.getById(batchId);

      if(!batch){
        return next(new Error("La tanda no existe."));
      }
      res.status(201).json({
        ok:true,
        batch,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllBatches: async (req,res,next) => {
    try {
      const batch = await batchService.getAll();
      res.status(200).json({
        ok:true,
        data:batch,
      });
      if (!batch) {
        return next( new Error("No existen tandas"));
      }
    } catch (error) {
      next(error);
    }
  },

  deleteBatch: async (req,res,next) => {
    try {
      const batchId = req.body.batchId;
      const batch = await batchService.delete(batchId);
      if (!batch) {
        throw new Error("La tanda no existe");
      }
      
      res.status(204).json({
        ok:true,
      });
    } catch (error) {
      next(error);
    }
  },

  editBatch: async (res,req,next) => {
    try {
      const batchId = req.body.batchId;
      const batch = await batchService.edit(batchId);

      if (!batch) {
        return next( new Error("La tanda no existe"));
      }

      res.status(204).json({
        ok:true,
        batch
      });
    } catch (error) {
      next(error);
    }
  },
};