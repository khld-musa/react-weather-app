import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {

  const fetchWeather = async (query) => {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: query,
        units: 'metric',
        APPID: 'd0520f0d92c47eff349adc40b171626f',
      }
    });

    return data;
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {

    const data = await fetchWeather(query);

    setWeather(data);
    setQuery('');

  }



  return (
    <body>

      <header className="bg-light">
      <input className="search border" type="text" placeholder="input city name..." value={query} onChange={(e) => setQuery(e.target.value)}/> 
          <button className="btn1 border bg-success text-light" onClick={search}>Search</button>     
      </header>

      <main className="container">
        <div >
          {weather.main && (
            <div className="city row ">
              <h2 className="city-name">
                <span className=''>
                  {weather.name}
                  </span>
                <sup>
                  {weather.sys.country} 
                </sup>
              </h2>
              <div className="city-temp">
                {Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
              </div>
              <div className="info">
                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                <p className="desc">{weather.weather[0].description}</p>
              </div>
            </div>
          )}
        </div>
      </main>

    </body>
  );
}

export default App;
