const UserService = require("../services/user");
const createHttpError = require("http-errors");

module.exports = {
  createUser: async (req, res, next) => {
    console.log("createUser");
    try {
      const { email, roles, name, surname } = req.body;

      const password = await UserService.resetDefaultPassword(name, surname);

      let user = await UserService.getByEmail(email);

      if (user) {
        const error = new createHttpError.BadRequest("Ya existe un usuario registrado con ese nombre.");
        return next(error);
      }

      await UserService.create(email, password, roles, name, surname);

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

  getUserById: async (req, res, next) => {
    console.log("getUserById");
    try {
      const userLogged = req.userLogged;
      const userId = req.params.userId;
      const isAdmin = userLogged.roles.find(element => element.name == "admin")

      if (userLogged._id !== userId && isAdmin === undefined) {
        const error = new createHttpError.BadRequest("Necesita ser admin para acceder a la informacion.");
        return next(error);
      }

      const user = await UserService.getById(userId);

      if (!user) {
        const error = new createHttpError.BadRequest("Ya existe el usuario.");
        return next(error);
      }

      res.status(200).json({
        ok: true,
        data: user,
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
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
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
        const error = new createHttpError.BadRequest("Necesita ser admin para realizar la accion.");
        return next(error);
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
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
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
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },

  changePassword: async (req, res, next) => {
    console.log("changePassword");
    try {
      const userId = req.userLogged._id;

      const { oldPassword, newPassword } = req.body; 

      const user = await UserService.getById(userId);

      if (!user) {
        const error = new createHttpError.BadRequest("No existe el usuario.");
        return next(error);
      }

      const matchPassword = await UserService.comparePassword(oldPassword, user.password);

      if (!matchPassword) {
        const error = new createHttpError.BadRequest("Constaseña incorrecta.");
        return next(error);
      }

      user.password = await UserService.encryptPassword(newPassword);
        
      await UserService.edit(userId, user);

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

  deleteUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;

      const user = await UserService.delete(userId);

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
