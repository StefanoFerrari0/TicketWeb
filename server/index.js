const PORT = process.env.PORT || 3001;

const app = require("./app");
const http = require("http");
const server = http.createServer(app);

const { initializeDB } = require("./config/init");

initializeDB();

server.listen(PORT, () => {
  console.log("Server en vivo por el puerto: ", PORT);
});
