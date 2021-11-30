const BatchService = require("../services/batches");
const createHttpError = require("http-errors");
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
      if(!batch)
      {
        const error = new createHttpError.BadRequest("No se pudo crear la tanda.");
        return next(error);
      }
      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  getBatchById: async (req, res, next) => {
    console.log("getBatchById");
    try {
      const batchId = req.params.batchId;
      const batch = await BatchService.getById(batchId);

      if (!batch) {
        const error = new createHttpError.BadRequest("La tanda no existe.");
        return next(error);
      }

      res.status(200).json({
        ok: true,
        data: batch,
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  getAllBatches: async (req, res, next) => {
    console.log("getAllBatches");
    try {
      const batch = await BatchService.getAll();

      if (!batch) {
        const error = new createHttpError.BadRequest("No existen tandas.");
        return next(error);
      }

      res.status(200).json({
        ok: true,
        data: batch,
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  editBatch: async (req, res, next) => {
    console.log("editBatch") 
    try {
      const { name, dateFrom, dateTo, price, quantity } = req.body;
      
      const batchId = req.params.batchId;
      
     if (!batchId) {
        const error = new createHttpError.BadRequest("La tanda no existe.");
        return next(error);
      }
        const data ={
        name,
        dateFrom,
        dateTo,
        price,
        quantity,
      };
      const batch = await BatchService.edit(batchId,data);
      if(!batch){
        const error = new createHttpError.BadRequest("No se modifico la tanda.");
        return next(error);
      }
      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    } 
  },

  deleteBatch: async (req, res, next) => {
    try {
      const batchesId = req.params.batchesId;
      const batch = await BatchService.delete(batchesId);
      if (!batch) {
        const error = new createHttpError.BadRequest("La tanda no existe.");
        return next(error);
      }

      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },
};
