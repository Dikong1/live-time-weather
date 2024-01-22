const express = require('express');
const https = require('https');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to fetch weather data
app.get("/weather", function(req, res) {
    const city = "Astana";
    console.log("city is" + city)
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0220b2ecd57ffeff232b00b52385a170&units=metric";


    https.get(weatherUrl, function(apiRes) {
        let data = '';

        apiRes.on('data', function(chunk) {
            data += chunk;
        });

        apiRes.on('end', function() {
            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            res.json({
                temperature: weatherData.main.temp,
                feelsLike: weatherData.main.feels_like,
                pressure: weatherData.main.pressure,
                humidity: weatherData.main.humidity,
                windSpeed: weatherData.wind.speed,
                countryCode: weatherData.sys.country,
                lon: weatherData.coord.lon,
                lat: weatherData.coord.lat,
                rain: weatherData.rain,
                description: weatherData.weather[0].description,
                iconUrl: "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            });
        });
    });
});

// Route for the root path
app.get("/", function(req, res) {
    res.send("Welcome to the Weather App!");
});



app.listen(3000, function() {
    console.log("Server is running on port http://localhost:3000");
});
