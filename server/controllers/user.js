const UserService = require("../services/user");

module.exports = {
  createUser: async (req, res, next) => {
    console.log("createUser");
    try {
      const { email, roles, name, surname } = req.body;

      const password = await UserService.resetDefaultPassword(name, surname);

      let user = await UserService.getByEmail(email);

      if (user) {
        return next(
          new Error("Ya existe un usuario registrado con ese nombre")
        );
      }

      await UserService.create(email, password, roles, name, surname);

      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    console.log("getUserById");
    try {
      const userLogged = req.userLogged;
      const userId = req.params.userId;
      const isAdmin = userLogged.roles.find(element => element.name == "admin")

      if (userLogged._id !== userId && isAdmin === undefined) {
        return next(
          new Error(
            "Para acceder a la información de otro usuario debe ser Admin."
          )
        );
      }

      const user = await UserService.getById(userId);

      if (!user) {
        return next(new Error("El usuario no existe."));
      }

      res.status(200).json({
        ok: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    console.log("getAllUsers");
    try {
      const users = await UserService.getAll();

      // borramos las contraseñas
      users.map((user) => {
        user.password = undefined; 
      }
      )

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
      const { email, roles, name, surname } = req.body;

      const userLogged = req.userLogged;
      const userId = req.params.userId;
      const isAdmin = userLogged.roles.find(element => element.name == "admin")

      if (userLogged._id !== userId && isAdmin === undefined) {
        return next(
          new Error(
            "Para editar la información de otro usuario debe ser Admin."
          )
        );
      }

      const data = {
        email,
        roles,
        name,
        surname,
      };

      await UserService.edit(userId, data);
      
      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },

  resetDefaultPassword: async (req, res, next) => {
    console.log("resetDefaultPassword");
    try {
      const userId = req.params.userId;

      const user = await UserService.getById(userId);

      user.password = await UserService.resetDefaultPassword(user.name, user.surname);
        
      await UserService.edit(userId, user);

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },

  changePassword: async (req, res, next) => {
    console.log("changePassword");
    try {
      const userId = req.userLogged._id;

      const { oldPassword, newPassword } = req.body; 

      const user = await UserService.getById(userId);

      if (!user) {
        return next(new Error("No existe el usuario."));
      }

      const matchPassword = await UserService.comparePassword(oldPassword, user.password);

      if (!matchPassword) {
        return next(new Error("La contraseña es incorrecta."));
      }

      user.password = await UserService.encryptPassword(newPassword);
        
      await UserService.edit(userId, user);

      res.status(201).json({
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

      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },
};
