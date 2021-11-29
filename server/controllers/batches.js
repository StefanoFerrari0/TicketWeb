const BatchService = require("../services/batches");

module.exports = {
  createBatch: async (req, res, next) => {
    console.log("createBatch");
    try {
      const { name, dateFrom, dateTo, price, quantity } = req.body;

      const batch = BatchService.create(
        name,
        dateFrom,
        dateTo,
        price,
        quantity
      );
      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },

  getBatchById: async (req, res, next) => {
    console.log("getBatchById");
    try {
      const batchId = req.params.batchId;
      const batch = await BatchService.getById(batchId);

      if (!batch) {
        return next(new Error("La tanda no existe."));
      }

      res.status(200).json({
        ok: true,
        data: batch,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllBatches: async (req, res, next) => {
    console.log("getAllBatches");
    try {
      const batch = await BatchService.getAll();

      if (!batch) {
        return next(new Error("No existen tandas"));
      }

      res.status(200).json({
        ok: true,
        data: batch,
      });
    } catch (error) {
      next(error);
    }
  },

  editBatch: async (req, res, next) => {
/*     try {
      const batchId = req.params.batchId;
      const batch = await BatchService.edit(batchId);

      if (!batch) {
        return next(new Error("La tanda no existe"));
      }

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    } */
  },

  deleteBatch: async (req, res, next) => {
    try {
      const batchesId = req.params.batchesId;
      const batch = await BatchService.delete(batchesId);
      if (!batch) {
        return next(new Error("La tanda no existe"));
      }

      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },
};
