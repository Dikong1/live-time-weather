const express = require('express');
const https = require('https');
const app = express();

app.get("/", function(req, appres){
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Astana&appid=2aa273236a076d23964c0e001d2d7a43&units=metric";
    // Make a request to get weather data
    https.get(weatherUrl, function(res) {
        console.log('Weather API statusCode: ', res.statusCode);

        res.on("data", function(data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdesc = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            // Display weather information
            appres.write(`<h1>Temp is ${temp}</h1>`);
            appres.write(`<h3>Weather description: ${weatherdesc}</h3>`);
            appres.write(`<img src="${iconURL}">`);

            appres.send();
            
        });
    });
});

app.listen(3000, function(){
    console.log("Server is running on port http://localhost:3000");
});
