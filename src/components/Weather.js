import React, { useState } from 'react';
import store from "store";
import logo200 from'../assets/200.png';
import logo300 from'../assets/300.png';
import logo500 from'../assets/500.png';
import logo600 from'../assets/600.png';

const Weather = () => {
    const weathers = store.get('weather') || [];
    const [cities, setCities] = useState(weathers);

    const weatherImages =(number) => {
        let digit = number.toString()[0];

        switch (digit){
            case '2':
                return logo200;
            case '3':
                return logo300;
            case '5':
                return logo500;
            case '6':
                return logo600;
            default:
                return logo200
        }
    };

    return (
        <div style={{display:'flex',flexDirection: 'column',marginLeft:16,marginRight: 16}}>
            <h1>Your weather list</h1>
            {cities.map((city) => (
                <div key={city.id} style={{display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                    <span style={{fontSize: 46}}>{city.name}</span> <img alt={city.name} src={weatherImages(city.weather[0].id)} style={{height:64, width: 64}} /> <br/>
                    <span>Humidity: {city.main.humidity}</span> <br/>
                    <span>Temp: {city.main.temp}</span> <br/>
                    <span>Temp max: {city.main.temp_max}</span> <br/>
                    <span>Temp min: {city.main.temp_min}</span> <br/>
                     <br/>
                    <span onClick={() => {
                        const newCities = cities.filter(c => c.id !== city.id)
                        store.set('weather', newCities);
                        setCities(newCities)
                    }} style={{cursor: 'pointer', fontSize: 32}}>X</span> <br/>
                    </div>
            ))}
        </div>
    )
};



export default Weather;