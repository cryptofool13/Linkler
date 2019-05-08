const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

const server = express();

server.use(bodyParser.json());
server.set("view engine", "pug");

server.get("/", (req, res) => {
  res.send('you hit "/"\ntry "/home"');
});

server.get("/home", (req, res) => {
  let links = db.getLinks();
  res.render("index", { links });
});

server.listen(3000, () => {
  console.log("server listening at port 3000");
});
