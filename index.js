const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./db");

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
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

server.post("/links/new", (req, res) => {
  let data = req.body;
  if (data.name && data.url) {
    db.addLink(data.name, data.url);
    res.redirect("/home");
  }
  // console.log(data);
  // if(data.hasOwnProperty('name'))
});
server.post("/links/del", (req, res) => {
  // console.log(Object.keys(req.body));
  for (let name of Object.keys(req.body)) {
    db.deleteLink(name);
  }
  res.redirect("/home");
});

server.listen(3000, () => {
  console.log("server listening at port 3000");
});
