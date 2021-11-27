//Servidor
var cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const { cors } = require("./config/init");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

//routes
const batchesRoutes = require("./api/routes/batches");
const eventRoutes = require("./api/routes/event");
const ticketRoutes = require("./api/routes/ticket");
const userRoutes = require("./api/routes/user");

//Middlewares
const { isLogin } = require("./middlewares/index");

app.use("/batches", isLogin, batchesRoutes);
app.use("/event", isLogin, eventRoutes);
app.use("/ticket", isLogin, ticketRoutes);
app.use("/user", userRoutes);

module.exports = app;
