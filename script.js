function sendData(event) {
    event.preventDefault();
    const searchCity = document.getElementById('searchCity').value;
    console.log(searchCity);

    fetch(`/weather?city=${searchCity}`)
        .then(response => response.json())
        .then(data => {
            processLiveWeather(data);
        })
    .catch(error => console.error('Error sending data to server:', error));
}

function processLiveWeather(data) {
    // const weatherInfo = document.getElementsByClassName('weather-container');
    // console.log(data);
    // weatherInfo.innerHTML = `
    //     <h2>${data.name}, ${data.sys.country}</h2>
    //     <p>Temperature: ${data.main.temp} &deg;C</p>
    //     <p>Feels Like: ${data.main.feels_like} &deg;C</p>
    //     <p>Description: ${data.weather[0].description}</p>
    //     <p>Humidity: ${data.main.humidity}%</p>
    //     <p>Pressure: ${data.main.pressure} hPa</p>
    //     <p>Wind Speed: ${data.wind.speed} m/s</p>
    //     <p>Rain Volume (last 3 hours): ${data.rain ? data.rain['3h'] : 0} mm</p>
    // `;
    // fetch('/weather')
    //     .then(response => response.json())
    //     .then(data => {
            console.log("processLiveWeather is running")
            document.getElementById('city').innerText = `${data.name}`;
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
            document.getElementById('rain').innerText = `Rain level ${data.rain ? data.rain['3h'] : 0}`;
            console.log(".....................................");
        // })    
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


