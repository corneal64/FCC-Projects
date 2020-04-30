const os = require("os");
const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes/routes.js");
const app = express();

const host = os.hostname();
const port = process.env.PORT || 3000;
const db_uri = process.env.MONGODB_ADDON_URI || "mongodb://localhost:27017/urls_data";

const options = {
    useMongoClient: true
}
mongoose.connect(db_uri, options, () => {
    console.log("=> Connected to Database!");
});

app.set("view engine", "ejs");
app.use("/", routes);

app.listen(port, function () {
    console.log(`=> Server started! Visit http://${host}:${port}`);
});