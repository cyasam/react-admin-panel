require("dotenv").config();
const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

const port = process.env.PORT || 5000;

server.use(jsonServer.bodyParser);
server.use(middlewares);

authRoutes(server);
apiRoutes(server, router);

server.listen(port, () => {
  console.log("JSON Server is running");
});
