const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/init");

//routes
const batchesRoutes = require("./api/routes/batches");
const eventRoutes = require("./api/routes/event");
const ticketRoutes = require("./api/routes/ticket");
const userRoutes = require("./api/routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(config.cors);

app.use("/batches", batchesRoutes);
app.use("/event", eventRoutes);
app.use("/ticket", ticketRoutes);
app.use("/user", userRoutes);

module.exports = app;
