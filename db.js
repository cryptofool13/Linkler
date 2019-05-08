const fs = require("fs");
// DATABASE INITIALIZATION
//
// const dbTemplate = {
//   links: [
//     {
//       url: "www.google.com",
//       name: "google"
//     }
//   ]
// };

// fs.writeFileSync("./db.json", JSON.stringify(dbTemplate));

function addLink(name, url) {
  let newLink = { url, name };
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    let db = JSON.parse(data);
    db.links.push(newLink);
    db = JSON.stringify(db);

    fs.writeFile("./db.json", db, err => {
      if (err) {
        console.log(err);
        return err;
      }
      console.log("db updated");
    });
  });
}

function getLinks(cb) {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    let links = JSON.parse(data).links;
    return cb(links);
  });
}

function deleteLink(name) {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    let db = JSON.parse(data);
    let links = db.links;
    let index;
    for (i in links) {
      if (!links[i]) continue;
      if (links[i].name === name) {
        index = i;
        // console.log(links[i]);
      }
    }
    if (index == links.length - 1) {
      console.log("popped");
      db.links.pop();
    } else {
      delete links[index];
      for (let j = index; j < links.length - 2; j++) {
        links[j] = links[j + 1];
      }
    }
    db = JSON.stringify(db);
    fs.writeFile("./db.json", db, err => {
      if (err) {
        console.log(err);
        return err;
      }
    });
  });
}

// addLink("c++", "www.cplusplus.org");
// deleteLink("test");
// setTimeout(() => getLinks(), 3000);
// getLinks();
module.exports = {
  addLink,
  getLinks,
  deleteLink
};
