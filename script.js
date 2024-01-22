function sendData() {
    const searchCity = document.getElementById('searchCity').value;
    console.log(searchCity);

    fetch('/weather')
        .then(response => response.json())
        .then(data => {
            processLiveWeather(data, searchCity);
        })
    .catch(error => console.error('Error sending data to server:', error));
}

function processLiveWeather(data, city) {
    fetch('/weather')
        .then(response => response.json())
        .then(data => {
            console.log("processLiveWeather is")
            document.getElementById('city').innerText = city;
            document.getElementById('temperature').innerText = `${data.temperature}°C`;
            document.getElementById('weather-description').innerText = `Outside is ${data.description}`;
            document.getElementById('weather-icon').src = `${data.iconUrl}`;
            document.getElementById('feelsLike').innerText = `Feels like ${data.feelsLike}°C`;
            document.getElementById('wind').innerText = `Wind speed: ${data.windSpeed}m/s`;
            document.getElementById('country').innerText = `Country code: ${data.countryCode}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.humidity}%`;
            document.getElementById('pressure').innerText = `Pressure: ${data.pressure} mbar`;
            document.getElementById('lon').innerText = `Lon: ${data.lon}`;
            document.getElementById('lat').innerText = `Lat: ${data.lat}`;
            document.getElementById('rain').innerText = `Rain level ${data.rain}`;
            console.log(".....................................")
        })    
}

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/weather')
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('city').innerText = document.getElementById('searchCity').value;
//             document.getElementById('temperature').innerText = `${data.temperature}°C`;
//             document.getElementById('weather-description').innerText = `Outside is ${data.description}`;
//             document.getElementById('weather-icon').src = `${data.iconUrl}`;
//             document.getElementById('feelsLike').innerText = `Feels like ${data.feelsLike}°C`;
//             document.getElementById('wind').innerText = `Wind speed: ${data.windSpeed}m/s`;
//             document.getElementById('country').innerText = `Country code: ${data.countryCode}`;
//             document.getElementById('humidity').innerText = `Humidity: ${data.humidity}%`;
//             document.getElementById('pressure').innerText = `Pressure: ${data.pressure} mbar`;
//             document.getElementById('lon').innerText = `Lon: ${data.lon}`;
//             document.getElementById('lat').innerText = `Lat: ${data.lat}`;
//             document.getElementById('rain').innerText = `Rain level ${data.rain}`;
//         })
//         .catch(error => console.error('Error fetching weather data:', error));
// });


