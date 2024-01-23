function initMap(lat, lon) {
    const map = L.map('map').setView([lat, lon], 10);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    L.marker([lat, lon]).addTo(map);
}

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
            initMap(data.lat, data.lon);
            console.log(".....................................");
        // })    
}

document.addEventListener('DOMContentLoaded', function() {
    displayExchangeRate();
    displayHolidays();
});

function displayExchangeRate() {
    fetch(`/exchangeRate`)
        .then(response => response.json())
        .then(data => {
            const exchangeRateElement = document.getElementById('exchange-rate');
            if (exchangeRateElement) {
                exchangeRateElement.innerText = `Exchange Rate USD to KZT: ${data.kzt}`;
                console.log(`Exchange Rate: ${data.kzt}`);
            }
        })
}

function displayHolidays() {
    fetch(`/publicHolidays`)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            const holidaysElement = document.getElementById('holidays');
            const holidaysList = document.createElement('ul');

                data.nextHolidays.forEach(holiday => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${holiday.date}: ${holiday.name}`;
                    holidaysList.appendChild(listItem);
                });

                holidaysElement.innerHTML = '';
                holidaysElement.appendChild(holidaysList);
        })
}
