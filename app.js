const express = require('express');
const https = require('https');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '')));

// Endpoint to fetch weather data
app.get("/weather", function(req, res) {
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Astana&appid=0220b2ecd57ffeff232b00b52385a170&units=metric";

    https.get(weatherUrl, function(apiRes) {
        let data = '';

        apiRes.on('data', function(chunk) {
            data += chunk;
        });

        apiRes.on('end', function() {
            const weatherData = JSON.parse(data);
            res.json({
                temperature: weatherData.main.temp,
                description: weatherData.weather[0].description,
                icon: weatherData.weather[0].icon
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
