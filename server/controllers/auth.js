var UserController = require("../controllers/user");
var User = require("../models/userModel");
var jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/index");

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      let user = await UserController.getUserByEmail(email);

      if (!user) {
        return next(new Error("El email no existe"));
      }

      const matchPassword = await User.comparePassword(
        req.body.password,
        user.password
      );

      if (!matchPassword) {
        return next(new Error("La contraseña es incorrecta."));
      }

      const token = jwt.sign({ id: user._id }, TOKEN_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      user.accessToken = token;
      const data = user;
      await UserController.editUser(data);

      res.cookie("accessToken", token, {
        //Cambiarlo en produccion a true al httpOnly
        expires: 86400,
        httpOnly: false,
        sameSite: "lax",
      });

      res.status(201).json({
        ok: true,
        data: {
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
