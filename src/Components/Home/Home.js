
import { ExpandMoreRounded } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { userContext } from '../../App';
import image from '../Images/bg-image.jpg';
import './Home.css';
const Home = () => {
    const [userLoggedInfo, setUserLoggedInfo] = useContext(userContext);
    const [cityName, setCityName] = useState('');
    const [tempInfo, setTempInfo] = useState({});

    function weatherAPI(location) {
        const API_KEY = `0bc4667dc34c5a4132ef507488547ddc`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

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
            country: data.sys.country, 
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
    console.log(userLoggedInfo);
    return (
        <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', height: '100vh'}}>
            <div className='container'>
                <Form className='d-flex h-5'>
                    <div className='col-md-10'>
                        <input
                            onBlur={(event) => {
                                setCityName(event.target.value);
                            }}
                            type='text'
                            className='form-control'
                            placeholder='Enter a location for Weather ...'
                        />
                    </div>
                    <div className='col-md-2'>
                        <Button onClick={() => weatherAPI(cityName)} variant='danger'>
                            Search
                        </Button>
                    </div>
                </Form>
                <div className='weather-status text-white text-center'>
                    <img src='https://openweathermap.org/img/wn/02d@2x.png' alt='' />
                    <h1>{tempInfo.name}</h1>
                    <h1>{tempInfo.country}</h1>
                    <h3>
                        <span>{tempInfo.temp}</span>&deg;C
                    </h3>
                    <h1 className='lead'>{tempInfo.main}</h1>
                    {userLoggedInfo.email ? <p>Welcome! You are logged in.</p> :<p>You are not logged in.</p>}
                    <button id='hidebtn' onClick={() => {document.getElementById('more').style.display = "block"; document.getElementById('hidebtn').style.display = "none"}}>
                        more info
                        <ExpandMoreRounded></ExpandMoreRounded>
                    </button> 
                    <div style={{display: 'none'}} id='more'>
                        <h1 > Feels Like: {tempInfo.feels_like}, Minimum temperature: {tempInfo.temp_min}, maximum temperature: {tempInfo.temp_max}, Temperature pressure: {tempInfo.pressure}</h1>
                        <h1>Wind deg: {tempInfo.deg}, Wind speed: {tempInfo.speed}</h1>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;
