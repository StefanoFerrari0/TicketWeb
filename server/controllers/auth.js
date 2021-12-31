const User = require("../models/userModel");
const UserService = require("../services/user");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/index");
const createHttpError = require("http-errors");

module.exports = {
  loginUser: async (req, res, next) => {
    console.log("loginUser");
    try {
      const { email, password } = req.body;

      const user = await UserService.getByEmail(email);

      if (!user) {
        const error = new createHttpError.BadRequest(`No existe ninguna cuenta asociada a ese email.`);
        return next(error);
      }

      const matchPassword = await User.comparePassword(password, user.password);

      if (!matchPassword) {
        const error = new createHttpError.BadRequest("La contraseña es incorrecta.");
        return next(error);
      }

      const token = jwt.sign({ id: user._id }, TOKEN_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      user.accessToken = token;

      const data = user;
      await UserService.edit(data);

      res.cookie("accessToken", token, {
        expires: new Date(Date.now() + 86400000),
        //Cambiarlo en produccion a true
        httpOnly: false,
        sameSite: "lax",
      });


      res.status(201).json({
        ok: true,
        data: {
          _id: user._id,
          email: user.email,
          name: user.name,
          roles: user.roles,
          token,
        },
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

  verifyToken: async (req, res, next) => {
    console.log("verifyToken");
    try {
      const accessToken  = req.cookies.accessToken;

      if(!accessToken){
        const error = new createHttpError.BadRequest("El token está vacio");
        return next(error);
      }

      const { id, exp } = jwt.verify(accessToken, TOKEN_SECRET);

      if (!id) {
        const error = new createHttpError.BadRequest("Token inválido.");
        return next(error);
      }

      const userId = id;
      const userLogged = await UserService.getById(userId);

      if (!userLogged) {
        const error = new createHttpError.BadRequest("Usuario no encontrado.");
        return next(error);
      }

      if (userLogged.isDelete) {
        const error = new createHttpError.BadRequest("El usuario ha sido eliminado, por favor contactar con un administrador.");
        return next(error);
      }

      // Si el token expiró
      if (exp < Date.now().valueOf() / 1000) {
        res.clearCookie("accessToken");
        const error = new createHttpError.BadRequest(`"JWT token ha expirado, por favor inicie sesión para obtener uno nuevo."`);
        return next(error);
      }

      res.locals.userLogged = userLogged;
      req.userLogged = userLogged;

      res.status(201).json({
        ok: true,
        data: {
          _id: userLogged._id,
          email: userLogged.email,
          name: userLogged.name,
          surname: userLogged.surname,
          roles: userLogged.roles,
        },
      });
    } catch (error) {
      const httpError = createHttpError(error.status, error);
			next(httpError);
    }
  },
};
