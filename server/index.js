const http = require("http");
const PORT = process.env.PORT || 3001;
const app = require("./app");

const server = http.createServer(app);
const { initializeDB } = require("./config/init");

initializeDB();
server.listen(PORT);
