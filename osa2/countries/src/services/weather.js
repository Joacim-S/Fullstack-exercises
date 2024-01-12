import axios from 'axios'
const icon_baseUrl = 'https://openweathermap.org/img/wn/'
const weather_baseurl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getWeather = (city) => (
    axios
          .get(`${weather_baseurl}${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(response => response.data)
  )

const getIcon = (icon) => {
    return(
    axios
          .get(`${icon_baseUrl}${icon}@2x.png`)
      .then(response => response.data)
    )
}


export default{
    getWeather,
    getIcon
}