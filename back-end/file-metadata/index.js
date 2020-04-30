const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(multer({
  dest: './uploads/'
}).single("file"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  res.json({
    filesize: req.file.size
  });
  removeFiles();
});

app.listen(port, function () {
  console.log(`Server Started on port ${port}`);
});

function removeFiles() {
  const dir = "uploads";

  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(dir, file), err => {
        if (err) throw err;
      });
    }
  });
}