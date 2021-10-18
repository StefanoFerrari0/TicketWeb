const mongoose = require("mongoose");
require("dotenv").config();
const connection = {};

async function connectDB() {
  if (connection.isConnected) {
    return;
  }

  console.log("ENV FILE: ", process.env.MONGODB_URL);
  const db = await mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.lslsd.mongodb.net/TicketWeb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log("Conectado en MONGO DB");
  connection.isConnected = db.connections[0].readyState;
}

module.exports = connectDB;
