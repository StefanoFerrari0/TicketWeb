const express = require("express");
const router = express.Router();
const BatchesController = require("../../controllers/batches");

//Create
router.post("/", BatchesController.createBatch ); 

//GetById
router.get("/:batchId", BatchesController.getBatchById);

//GetAll
router.get("/", BatchesController.getAllBatches);

//Edit
router.put("/edit/:batchesId", BatchesController.editBatch); 

//Delete
router.put("/:batchesId", BatchesController.deleteBatch ); 

module.exports = router;
