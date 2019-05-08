const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./db");

const server = express();

server.use(bodyParser.json());
server.set("view engine", "pug");
server.set("views", path.join(__dirname, "views"));

server.get("/", (req, res) => {
  res.send('you hit "/"\ntry "/home"');
});

server.get("/home", (req, res) => {
  db.getLinks(links => {
    res.render("index", { links: links });
  });
});

server.listen(3000, () => {
  console.log("server listening at port 3000");
});
