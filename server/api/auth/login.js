/* import connectDB from "../../utils/connectDB";
import User from "../../models/userModel";
import jwt from "jsonwebtoken";
import Cookies from "cookies";

connectDB();

const handler = async (req, res) => {
  const { method } = req;
  const { email, password, roles } = req.body;

  switch (method) {
    //Iniciar sesión
    case "POST":
      try {
        const getUser = await User.findOne({ email: email }).populate("roles");

        if (!getUser) {
          throw new Error("El usuario no se encuentra registrado.");
        }

        const matchPassword = await User.comparePassword(
          password,
          getUser.password
        );

        if (!matchPassword) {
          throw new Error("La contraseña ingresada es incorrecta");
        }

        const token = jwt.sign({ id: getUser._id }, process.env.TOKEN_SECRET, {
          expiresIn: 86400,
        });

        const cookies = new Cookies(req, res);

        cookies.set("accessToken", token, {
          //Cambiarlo en produccion a true
          httpOnly: false,
          sameSite: "lax",
        });

        res.status(200).json({
          success: true,
          message: "Has iniciado sesión correctamente",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
          token: null,
        });
      }
      break;

    default:
      res.status(400).json({ success: false, token: null });
      break;
  }
};

export default handler;
 */
