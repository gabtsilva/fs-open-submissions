import {useEffect, useState} from "react";
const Weather = ({capital, latitude, longitude}) => {
    // Could not set the weather API key as an environment variable so I had to hardcode it
    const API_KEY = "very_secret_api_key";
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data)
                console.log(data)
            })
    }, []);

    return weatherData ? (
        <>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} width="100" height="auto"/>
            <p>Wind: {weatherData.wind.speed} m/s</p>
        </> ) : <p>Loading weather data...</p>
}

export default Weather