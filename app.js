const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {

    res.sendFile(__dirname + "/index.html");

})

app.post('/', function(req, res) {

    const query = req.body.cityName;
    const apikey = "a453865db822d735aa7fc76268ffa97a"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units + ""

    https.get(url, function(response) {
        console.log(response.statusCode);


        response.on("data", function(data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
            res.write("<h3>The temperature is currently " + weatherDesc + "</h3>")
            res.write("<img src=" + imageURL + ">")
            res.send();
        })
    })




})




app.listen(3000, function() {
    console.log("Server Started at port 3000")
})