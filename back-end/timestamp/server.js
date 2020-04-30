const express = require('express');
const moment = require("moment");
const app = express();
const port = process.env.PORT || 3000;

// Use 'ejs' as the templating engine
app.set("view engine", "ejs");

// Root route
app.get('/', function (req, res) {
    res.render("home");
});

// '/somedate' route
app.get("/:date", function (req, res) {
    const url = req.params;
    const userInput = url.date;

    // Checks if it's a valid natural date.
    if ((new Date(userInput)).getTime() > 0) {
        const newDate = new Date(userInput);
        const unixepoch = newDate.getTime();

        let unixepoch2 = unixepoch;
        unixepoch2 /= 1000;
        unixepoch2 += 21600;
        const naturalDate = moment(unixepoch).format('MMMM D, YYYY');

        const fromNatural = {
            unix: unixepoch2,
            natural: naturalDate
        };

        res.send(fromNatural);

        // Responds to unix epoch
    } else if (Number(userInput) && !isNaN(moment.unix(Number(userInput)))) {
        const dateString = moment.unix(userInput);
        const date = new Date(dateString);
        const naturalDate2 = moment(date).format('MMMM D, YYYY');
        const unixTime = (Number(userInput));

        const fromUnix = {
            unix: unixTime,
            natural: naturalDate2
        };

        res.send(fromUnix);

    } else {

        res.send({
            "unix": null,
            "natural": null
        });
    }
});

// Start server at localhost:3000
app.listen(port, function () {
    console.log(`Server started on port ${port}!`);
});