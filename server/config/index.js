const dotenv = require("dotenv");
const { resolve } = require("path");
dotenv.config({ path: resolve(__dirname, "./.env") });

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
};
