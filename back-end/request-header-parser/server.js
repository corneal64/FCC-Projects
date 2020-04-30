const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", function (req, res) {

    const lang = req.headers["accept-language"].split(",")[0];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    const os = req.headers['user-agent'].split(' (')[1].split(") ")[0];
    const ip_arr = ip.split(":");

    const userInfo = {
        ipaddress: ip_arr[ip_arr.length - 1],
        language: lang,
        software: os
    };

    res.json(userInfo);
});

app.listen(port, function () {
    console.log(`App running on port ${port}...`);
});