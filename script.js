var city = "Astana"

document.addEventListener('DOMContentLoaded', function() {
    fetch('/weather')
        .then(response => response.json())
        .then(data => {
            document.getElementById('temperature').innerText = city + ` ${data.temperature}`;
            document.getElementById('weather-description').innerText = `Weather description: ${data.description}`;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
        })
        .catch(error => console.error('Error fetching weather data:', error));
});
