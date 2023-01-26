import React, {useEffect, useState} from "react";
import axios from "axios";

import clouds from '../Images/clouds.png';
import rain from '../Images/rain.png';
import haze from '../Images/haze.png';
import smoke from '../Images/smoke.png';
import dust from '../Images/dust.png';
import sun from '../Images/sun.png';
import snow from '../Images/snow.png';


import Alert from "./Alert";


const MainPage = () => {

    const [weatherData, setWeatherData] = useState({})
    const [locationTerm, setLocationTerm] = useState('')
    const [background, setBackground] = useState('')
    const [weatherImage, setWeatherImage] = useState({})
    const [celsius, setCelsius] = useState('')
    const [feelsLike, setFeelsLike] = useState('')
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [errorMsg, setErrorMsg] = useState({})

    const key = 'd304ad3809f27e53bc87699636ab9b09';


    const getUpdate = (event) => {
        if (event.keyCode === 13) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${locationTerm}&appid=${key}`).then(({data}) => {
                setWeatherData(data)
                setLocationTerm('')
            }).catch((error) => {
                setAlertOpen(true)
                setErrorMsg(error.response.data.message)
            });
        }
    }

    const tempInCelsius = () => {
        if (weatherData.main) {
            const a = (weatherData.main.temp - 273.15).toFixed(0);
            const b = (weatherData.main.feels_like - 273.15).toFixed(0);
            setCelsius(a)
            setFeelsLike(b)
        }
    }

    const mainBackground = () => {
        if (!weatherData.main) {
            setBackground('main-image-default');
        } else if (celsius < 10) {
            setBackground('main-image-cold');
        } else if (celsius > 10) {
            setBackground('main-image-summer');
        }
    }

    const closeAlert = () => {
        setAlertOpen(false)
    }

    const weatherImg = () => {
        if (weatherData.main && weatherData.weather[0].main === 'Clouds') {
            setWeatherImage(clouds)
            console.log('clouds')
        } else if (weatherData.main && weatherData.weather[0].main === 'Haze') {
            setWeatherImage(haze)
            console.log('haze')
        } else if (weatherData.main && weatherData.weather[0].main === 'Rain') {
            setWeatherImage(rain)
            console.log('rain')
        } else if (weatherData.main && weatherData.weather[0].main === 'Dust') {
            setWeatherImage(dust)
        } else if (weatherData.main && weatherData.weather[0].main === 'Clear') {
            setWeatherImage(sun)
        } else if (weatherData.main && weatherData.weather[0].main === 'Snow') {
            setWeatherImage(snow)
        } else {
            setWeatherImage(smoke)
        }
    }


    useEffect(() => {
        tempInCelsius()
        mainBackground()
        weatherImg()
    })

    console.log(weatherData.main)

    return (
        <div className={`main container-fluid text-center ${background}`}>
            {alertOpen && <Alert error={errorMsg} open={alertOpen} closeAlert={closeAlert}/>}
            <div className="search-sec">
                <div className="row">
                    <div className="col-12">
                        <input onKeyDown={getUpdate} className={'search-input'} type="text"
                               placeholder={'Search by City...'} onChange={(e) => {
                            setLocationTerm(e.target.value)
                        }} value={locationTerm}/>
                    </div>
                </div>
            </div>
            <div className="temp-display-sec">
                <div className="row">
                    <div className="col-6">
                        {weatherData ? <h3>{weatherData.name}</h3> : null}
                        {weatherData.main ? <h1 className={'heading-text'}>{celsius}° C</h1> : null}
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                        {weatherData.main ?
                            <img className={'weather-img'} src={weatherImage}
                                 alt="weather icon"/> : null}
                        {weatherData.main ? <h3 className={'weather-kind '}>{weatherData.weather[0].main}</h3> : null}
                    </div>
                </div>
            </div>
            {weatherData.main && <div className="weather-detail-sec">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center gap-5">
                        <div className="feels-like">
                            {weatherData.main ? <h2>{feelsLike}° C</h2> : null}
                            <h6>Feels Like</h6>
                        </div>
                        <div className="humidity">
                            {weatherData.main ? <h2>{weatherData.main.humidity}%</h2> : null}
                            <h6>Humidity</h6>
                        </div>
                        <div className="winds">
                            {weatherData.main ? <h2>{weatherData.wind.speed} MPH</h2> : null}
                            <h6>Winds</h6>
                        </div>
                    </div>
                </div>
            </div>}

            {!weatherData.main && <div className="empty-message">
                <div className="row">
                    <div className="col-12">
                        <h1 className={'message-text'}>Search weather condition of your City...</h1>
                    </div>
                </div>
            </div>}

        </div>
    );
}

export default MainPage


