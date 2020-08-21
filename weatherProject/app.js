const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {
    let cityName = req.body.cityName;
    https.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",uk&appid=6ae46af01929cc5d1a1e421272a15d1b&units=metric", function (respond) {
        respond.on("data", function (data) {
            let weatherLondon = JSON.parse(data);
            console.log(weatherLondon.main.temp);
        })
    });
});




app.listen(3000, function () {
    console.log("server is listening");
});