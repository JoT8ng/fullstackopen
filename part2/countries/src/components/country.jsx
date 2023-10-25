import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ countries }) => {
    const [geoData, setGeoData] = useState([])

    const apikey = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        const getLocation = async () => {
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${countries.capital}&appid=${apikey}`
            );
            setGeoData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        getLocation();
      }, [countries.capital, apikey]);

    return (
      <div>
        <h1>{countries.name.common}</h1>
        <p>Capital: {countries.capital}</p>
        <p>Area: {countries.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(countries.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        {geoData && Object.keys(geoData).length !== 0 && (
          <div>
            <h1>Weather in {countries.name.common}</h1>
            <p>temperature {geoData.main.temp} Fahrenheit</p>
            <img src={`https://openweathermap.org/img/wn/${geoData.weather[0].icon}@2x.png`} alt='Weather Icon'></img>
            <p>wind {geoData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    )
}

export default Country;