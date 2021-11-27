const UserService = require("../services/user");
const Role = require("../models/roleModel");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/index");

module.exports = {
  isRole: function (name) {
    return async (req, res, next) => {
      try {
        const userId = req.userId;
        const user = UserService.getById(userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === name) {
            next();
            return;
          }
        }

        return next(
          new Error(`Para poder realizar esta acción requiere el rol ${name}.`)
        );
      } catch (error) {
        next(error);
      }
    };
  },

  isLogin: async (req, res, next) => {
    if (req.cookies && req.cookies.accessToken) {
      try {
        const accessToken = req.cookies.accessToken;
        const { id, exp } = await jwt.verify(accessToken, TOKEN_SECRET);

        const userLogged = await UserService.getById(id);

        if (!userLogged) {
          next(new Error(`Usuario no encontrado.`));
        }

        // Si el token expiró
        if (exp < Date.now().valueOf() / 1000) {
          res.clearCookie("accessToken");
          next(
            new Error(
              `"JWT token ha expirado, por favor inicie sesión para obtener uno nuevo."`
            )
          );
        }

        res.locals.loggedInUser = userLogged;
        req.userId = userLogged;

        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  },
};
