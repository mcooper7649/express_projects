const https = require("https");
const express = require("express");   //Default express configuration needed
const bodyParser = require("body-parser")
const app = express();




app.use(bodyParser.urlencoded({extend: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
    const query = req.body.cityName
    const apiKey = "34c9ed530825ec44ee8170d08491a54e" 
    const unit = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData =  JSON.parse(data)
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            const weatherDescription = weatherData.weather[0].description
            console.log(weatherDescription)
            res.write("<p>Weather Description: " + weatherDescription + "</p>")
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees.</h1>")
            res.write("<img src=" + imageUrl + "></img>")
            res.send()
        })
    })
})
















app.listen(3000, function(){
    console.log("server is running on port 3000.")
})