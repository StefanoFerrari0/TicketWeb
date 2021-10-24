const express = require("express");
const connectDB = require("./utils/connectDB");

require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();

connectDB();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
