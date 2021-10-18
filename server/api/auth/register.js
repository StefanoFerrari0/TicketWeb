import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import jwt from "jsonwebtoken";
import Role from "../../../models/roleModel";
import Cookies from "cookies";

connectDB();

const handler = async (req, res) => {
  const { method } = req;
  const { username, password, email, roles } = req.body;

  switch (method) {
    //Registrarse
    case "POST":
      const user = new User({
        username,
        email,
        password: await User.encryptPassword(password),
      });

      if (roles) {
        const getRoles = await Role.find({ name: { $in: roles } });
        user.roles = getRoles.map((role) => role._id);
      } else {
        const role = await Role.findOne({ name: "user" });
        user.roles = [role._id];
      }

      try {
        const createUser = await User.create(user);

        const token = jwt.sign(
          { id: createUser._id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: 86400,
          }
        );

        res.status(201).json({
          success: true,
          message: "Te has registrado correctamente",
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
