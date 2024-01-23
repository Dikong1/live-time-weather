const express = require('express');
const https = require('https');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const openExchangeApi = "cde30c9712e647aaba74f5926869446b";

app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to fetch weather data
app.get("/weather", function(req, res) {
    const city = req.query.city;
    const api = "2aa273236a076d23964c0e001d2d7a43"
    console.log("city is" + city)
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=metric";
    console.log(weatherUrl);

    https.get(weatherUrl, function(apiRes) {
        let data = '';

        apiRes.on('data', function(chunk) {
            data += chunk;
        });
        console.log(data)

        apiRes.on('end', function() {
            const weatherData = JSON.parse(data);
            console.log(weatherData, weatherData.name)
            const icon = weatherData.weather[0].icon;
            res.json({
                name: weatherData.name,
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
            console.log("end")
        });
    });
});

app.get("/exchangeRate", function(req, res) {
    const exchangeRateUrl = `https://openexchangerates.org/api/latest.json?app_id=${openExchangeApi}`;
    console.log(exchangeRateUrl);

    https.get(exchangeRateUrl, function(apiRes) {
        let data = '';

        apiRes.on('data', function(chunk) {
            data += chunk;
        });
        console.log(data)

        apiRes.on('end', function() {
            const exchangeData = JSON.parse(data);
            console.log(exchangeData)
            res.json({
                kzt: exchangeData.rates.KZT
            });
            console.log("end")
        });
    });
});


// app.get('/exchangeRate', function(req, res) {
//     const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${openExchangeApi}`;
//     const response = axios.get(apiUrl);

//     const rates = response.data.rates;
//     console.log(rates);
//     res.json({ rates });
//   });

// Route for the root path
app.get("/", function(req, res) {
    res.send("Welcome to the Weather App!");
});



app.listen(3000, function() {
    console.log("Server is running on port http://localhost:3000");
});
