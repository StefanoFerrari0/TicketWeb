const express = require("express");
const router = express.Router();
const BatchesController = require("../../controllers/batches");
const Middleware = require("../../middlewares/index");

//Create
router.post("/", Middleware.isRole("admin"), BatchesController.createBatch ); 

//GetById
router.get("/:batchId", BatchesController.getBatchById);

//GetAll
router.get("/", BatchesController.getAllBatches);

//Edit
router.put("/edit/:batchesId", Middleware.isRole("admin"), BatchesController.editBatch); 

//Delete
router.put("/delete/:batchesId", Middleware.isRole("admin"), BatchesController.deleteBatch); 

module.exports = router;
