var UserService = require("../services/user");
module.exports = {
  createUser: async (req, res, next) => {
    console.log("createUser");
    try {
      const { email, password, roles, name, surname } = req.body;

      /*    dentro del if hacer que saque algunos datos del nombre y 
      algunos del apellido y generarle una contraseña en base a eso. */
      if (!password) {
      }

      let user = await UserService.getByEmail(email);

      if (user) {
        return next(
          new Error("Ya existe un usuario registrado con ese nombre")
        );
      }

      UserService.create(email, password, roles, name, surname);

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    console.log("getUserById");
    try {
      const userId = req.params.userId;
      const user = await UserService.getById(userId);
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

  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserService.getAll();
      res.status(200).json({
        ok: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  editUser: async (req, res, next) => {
    console.log("editUser");
    try {
      const data = req.params.userId;

      const user = await UserService.getById(userId);
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

      const user = await UserService.delete(userId);
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
