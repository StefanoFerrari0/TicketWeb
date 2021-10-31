var User = require("../models/userModel");
var UserService = require("../services/user");
var jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/index");

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UserService.getByEmail(email);

      if (!user) {
        throw new Error("No existe ninguna cuenta asociada a ese email.");
      }

      const matchPassword = await User.comparePassword(password, user.password);

      if (!matchPassword) {
        return next(new Error("La contraseña es incorrecta."));
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
          email: user.email,
          roles: user.roles,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
