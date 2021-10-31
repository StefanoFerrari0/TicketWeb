var mongoose = require("mongoose");
var User = require("../models/userModel");
var Role = require("../models/roleModel");
var Cookies = require("cookies");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { email, password, roles, name, surname } = req.body;

      /*    dentro del if hacer que saque algunos datos del nombre y 
      algunos del apellido y generarle una contraseña en base a eso. */
      if (!password) {
      }

      let user = await User.findOne({ email });

      if (user) {
        return next(
          new Error("Ya existe un usuario registrado con ese nombre")
        );
      }

      const rolesFound = await Role.find({ name: { $in: roles } });

      user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password,
        name,
        surname,
        roles: rolesFound.map((role) => role._id),
        isDelete: false,
      });

      user.password = await User.encryptPassword(user.password);

      await user.save();

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      console.log("entre");
      const userId = req.params.userId;
      console.log("userid: ", userId);
      const user = await User.findById(userId);
      if (!user) {
        return next(new Error("El usuario no existe."));
      }
      res.status(200).json({
        ok: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserByEmail: async (req, res, next) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
        isDelete: false,
      }).populate("Role");

      if (!user) {
        return next(
          new Error("No existe ninguna cuenta asociada a ese email.")
        );
      }

      res.status(200).json({
        ok: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    const users = await User.find({ isDelete: false });
    res.status(200).json({
      ok: true,
      data: users,
    });
  },

  editUser: async (req, res, next) => {
    try {
      const data = req.body.data;
      const user = await User.findByIdAndUpdate(data._id, data);
      if (!user) return next(new Error("El usuario no existe."));

      res.status(204).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const data = {
        isDelete: true,
      };
      const user = await User.findByIdAndUpdate(userId, { isDelete: true });
      if (!user) {
        return next(new Error("El usuario no existe."));
      }

      res.status(204).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },
};
