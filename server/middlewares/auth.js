import User from "../models/userModel";
import Cookies from "cookies";
import Roles from "../models/roleModel";
import jwt from "jsonwebtoken";

require("dotenv").config();

export const config = {
  api: {
    bodyParser: false,
  },
};

export const tokenProtect = async (req, res) => {
  const cookies = new Cookies(req, res);
  let token;

  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  try {
    if (!token) {
      throw new Error("Inicia sesión para poder acceder.");
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    req.userId = user.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const isAdmin = async (req, res) => {
  const user = await User.findById(req.userId);

  const roles = await Roles.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      console.log("Es admin");
      return;
    }
  }
};

export const verifyToken = async (token) => {
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    return false;
  } else {
    return true;
  }
};
