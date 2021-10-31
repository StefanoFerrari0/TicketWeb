var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var BatchesController = require("../../controllers/batches");

//GetById
router.get("/:batchesId", BatchesController.getBatchById);

//GetAll
router.get("/api/batches",BatchesController.getAllBatches );

//Delete
router.delete("/:batchesId",BatchesController.deleteBatch ); 
//Edit
router.put("/:batchesId",BatchesController.editBatch); 

//Create
router.post("/api/batches",BatchesController.createBatch ); 

module.exports = router;
