const UserService = require("../services/user");
const Role = require("../models/roleModel");

module.exports = {
  isRole: function (name) {
    return async (req, res, next) => {
      try {
        const userId = req.userLogged._id;
        console.log("isRole - userId: ", userId);
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
    try {
      if (req.cookies && req.cookies.accessToken) {
        const accessToken = req.cookies.accessToken;
        const { id, exp } = await jwt.verify(accessToken, TOKEN_SECRET);

        const userId = id;
        const userLogged = await UserService.getById(userId);

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

        console.log("isLogin - userLogged ID: ", userLogged._id);
        res.locals.userLogged = userLogged;
        req.userLogged = userLogged;

        next();
      } else {
        return next(
          new Error(
            `Para poder realizar esta acción requiere estar autentificado.`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  },
};
