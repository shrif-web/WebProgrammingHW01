const fs = require("fs");
let fileText;
fs.readFile(
    "../database/lines.txt",
    "utf8",
    (err, data) => (fileText = data.split("\n"))
);

const hash = require("crypto");
const express = require("express");
const { request } = require("express");
const bodyParser = require("./node_modules/body-parser");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.end(JSON.stringify(req.body, null, 2));
});

app.post("/nodejs/sha", (req, res) => {
    let first = req.body.First;
    let second = req.body.Second;

    // if (!(isPositiveInteger(first) && isPositiveInteger(second)))
    //     return res.send({ Answer: "Number was expected for both inputs!" });
    console.log(req.body);

    const response = {
        Answer: first + second,
    };

    console.log(first, second);
    console.log(response.Answer);

    res.send({
        Operation: "SHA256",
        Answer: hash
            .createHash("sha256")
            .update(String(response.Answer))
            .digest("hex"),
        Error: "",
    });
});

app.get("/nodejs/write", (req, res) => {
    let { Line: lineNumber } = req.query;
    console.log(req.query);
    if (lineNumber > 100 || lineNumber < 0)
        return res.send("Error: Invalid index");
    if (lineNumber > 100 || lineNumber < 0)
        return res.send("Error: out of bound");
    const response = {
        result: String(fileText[lineNumber - 1]).replace("\r", ""),
    };
    res.send(response.result);
});

const port = 3000;
app.listen(port, () => console.log(`listenin on port ${port}...`));

function isPositiveInteger(x) {
    return Number.isInteger(x) && x > 0;
}
