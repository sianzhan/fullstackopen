import axios from 'axios'

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY

const getWeather = cityName => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
  return request.then(response => response.data)
}


const weatherService = { getWeather }

export default weatherService