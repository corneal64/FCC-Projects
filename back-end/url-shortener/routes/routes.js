const Url = require("../database/url.js");
const router = require("express").Router();
const urlRegex = require("url-regex");

router.get("/", function (req, res) {
    res.render("home");
});

router.get("/:code", function (req, res) {
    const code = req.params.code;

    if (code.length === 5) {
        Url.find({
                code: code,
            },
            function (err, data) {
                if (err) {
                    console.log("ERROR FINDING ITEM FROM DATABASE!");
                    res.json({
                        error: "Couldn't connect to the database!",
                    });
                }
                if (data.length === 0) {
                    res.json({
                        error: "This URL is not on the database.",
                    });
                } else {
                    res.redirect(data[0].original_url);
                }
            }
        );
    } else {
        res.json({
            error: "This URL is not on the database.",
        });
    }
});

router.get("/new/:url*", function (req, res) {
    const url = req.params.url + req.params[0];
    const hasHttp = url.search("http" || "https") > -1;
    const validUrl = urlRegex({
        exact: true,
    }).test(url);

    if (validUrl && hasHttp) {
        const id = makeid();

        const newUrl = {
            original_url: url,
            short_url: req.headers.host + "/" + id,
            code: id,
        };

        Url.create(newUrl, function (err, data) {
            if (err) {
                console.log("ERROR FROM DB, [CREATION]");
                res.json({
                    error: "Couldn't connect to the database!",
                });
            } else {
                res.json({
                    original_url: data.original_url,
                    short_url: data.short_url,
                });
            }
        });
    } else {
        res.json({
            error: "Wrong URL format, make sure you have a valid protocol and a real site.",
        });
    }
});

router.get("*", function (req, res) {
    res.redirect("/");
});

function makeid() {
    let text = "";
    let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = router;