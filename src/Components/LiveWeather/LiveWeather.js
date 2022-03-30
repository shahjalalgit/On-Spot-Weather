import React, { useState } from 'react';
import image from '../Images/bg-image.jpg';
const LiveWeather = () => {
    const [tempInfo, setTempInfo] = useState({});
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(showPosition);
        } else { 
          alert("Geolocation is not supported by this browser.");
        }
               
      function showPosition(position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          const API_KEY = `0bc4667dc34c5a4132ef507488547ddc`;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => displayTemperature(data));
      }
      const displayTemperature = (data) => {
        console.log(data);
        const { lon, lat } = data.coord;
        const { temp, feels_like, temp_min, temp_max, pressure } = data.main;
        const { main } = data.weather[0];
        const { deg, speed } = data.wind;
        const newTempInfo = {
            name: data.name,
            lon: lon,
            lat: lat,
            temp: temp,
            feels_like: feels_like,
            temp_min: temp_min,
            temp_max: temp_max,
            pressure: pressure,
            deg: deg,
            speed: speed,
            main: main,
        };
        setTempInfo(newTempInfo);
    };
    return (
        <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', height: '100vh'}}>
            <div className='weather-status text-white text-center'>
                    <img src='https://openweathermap.org/img/wn/02d@2x.png' alt='' />
                    <h1>{tempInfo.name}</h1>
                    <h3>
                        <span>{tempInfo.temp}</span>&deg;C
                    </h3>
                    <h1 >{tempInfo.main}, Feels Like: {tempInfo.feels_like}, Minimum temperature: {tempInfo.temp_min}, maximum temperature: {tempInfo.temp_max}, Temperature pressure: {tempInfo.pressure}</h1>
                    <h1>Wind deg: {tempInfo.deg}, Wind speed: {tempInfo.speed}</h1>


            </div>
        </div>
    );
};

export default LiveWeather;