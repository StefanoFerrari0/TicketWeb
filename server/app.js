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
const authRoutes = require("./api/routes/auth");
//Middlewares
const { isLogin } = require("./middlewares/index");

app.use("/api/batches", isLogin, batchesRoutes);
app.use("/api/event", isLogin, eventRoutes);
app.use("/api/ticket", isLogin, ticketRoutes);
app.use("/api/user", isLogin, userRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
