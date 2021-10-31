var mongoose = require("mongoose");
var Role = require("../models/roleModel");

module.exports = {
  createRol: async (req, res, next) => {
    try {
      const { name } = req.body;
      let role = await Role.findOne({ name });

      if (role) {
        return next(new Error("Ya existe un rol registrado con ese nombre"));
      }

      role = new Role({
        _id: new mongoose.Types.ObjectId(),
        name,
        isDelete: false,
      });

      await role.save();
      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },
};
