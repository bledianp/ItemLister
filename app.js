const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router("db.json");
const serveStatic = jsonServer.defaults({
  static: path.join(__dirname, "public"),
});

server.use(serveStatic);
server.use(router);

server.get('/', (req, res) => {
    res.send(path.join(__dirname, "public/index.html"))
});
server.listen(process.env.PORT || 3000, () => {
  console.log("JSON Server is running");
});
