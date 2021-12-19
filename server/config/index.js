const dotenv = require("dotenv");
const { resolve } = require("path");
dotenv.config({ path: resolve(__dirname, "./.env") });

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  SECRET_KEY: process.env.SECRET_KEY,
};
