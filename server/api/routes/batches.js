var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var BatchesController = require("../../controllers/batches");

//GetById
router.get("/:batchId", BatchesController.getBatchById);

//GetAll
router.get("/",BatchesController.getAllBatches);

//Delete
router.put("/:batchesId",BatchesController.deleteBatch ); 
//Edit
router.put("/edit/:batchesId",BatchesController.editBatch); 

//Create
router.post("/",BatchesController.createBatch ); 

module.exports = router;
