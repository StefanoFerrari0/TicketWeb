const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
};
