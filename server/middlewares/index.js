const UserService = require("../services/user");
const Role = require("../models/roleModel");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/index");

module.exports = {
  isRole: function (compareName) {
    return async (req, res, next) => {
      try {
        
        const name = req.userLogged.roles.name;  
        
        if(name === compareName)
        {
          return next();
        }
        return next(
          new Error(`Para poder realizar esta acción requiere el rol ${compareName}.`)
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
        const { id, exp } = jwt.verify(accessToken, TOKEN_SECRET);

        const userLogged = await UserService.getById(id);
        console.log(userLogged);
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
