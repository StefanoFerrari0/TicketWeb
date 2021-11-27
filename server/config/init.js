const mongoose = require("mongoose");
const { MONGODB_URL } = require("./index");
const Role = require("../models/roleModel");
const User = require("../models/userModel");
const UserController = require("../controllers/user");
const nodemailer = require("nodemailer");

module.exports = {
  initializeDB: async () => {
    mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.Promise = global.Promise;
    console.log("Conectado a la base de datos");
  },

  cors: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  },
  // el email de las 10hs y su config
  emailAddress: async (req, res, next) => {
    nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        /*user: process.env.EMAIL, // generated ethereal user
   pass: process.env.EMAILPASS, // generated ethereal password*/
        user: "gina.cormier44@ethereal.email",
        pass: "WVzCdVGKNKqhbADYD7",
      },
    });
  },
};
