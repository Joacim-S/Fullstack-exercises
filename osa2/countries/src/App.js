import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherservice from './services/weather'

const Fetch = ({countries, search, setSearch, setWeather}) => {
  const countriesToShow = countries.filter((country) => 
          country.name.common.toLowerCase().includes(search.toLowerCase()))

  if (countriesToShow.length > 10) {
    setWeather(null)
    return <TooMany/>
  }
  if (countriesToShow.length === 1) {
    return <CountryInfo
    country={countriesToShow[0]}
    setWeather={setWeather}
    />
  }

  setWeather(null)
  return (
    countriesToShow.map(country => 
    <Country key={country.name.official}
    name={country.name}
    setSearch={setSearch}
    />
    )
  )
}

const Languages = ({languages}) => {
  return (
      Object.values(languages).map(language => 
      <li key={language}>{language}</li>
    )
  )
}

const Flag = ({flag}) => {
  const flagStyle = {
    fontSize: 50
  }

  return (
    <div style={flagStyle}>
      {flag}
    </div>
  )
}

const TooMany = () => (
  <div>Too many matches, specify another filter</div>
)

const CountryInfo = ({country, setWeather}) => {

  useEffect(() => {
    weatherservice
    .getWeather(country.capital)
    .then(weatherData => {setWeather(weatherData)})
  }, [])

  return(
    <div>
      <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul key={country.id}><Languages languages={country.languages}/></ul>
      <Flag flag={country.flag}/>
    </div>
  )
}

const Country = (props) => {
  return(
  <div>
    {props.name.common}
    <button onClick={() => props.setSearch(props.name.common)}>
      show
    </button>
  </div>
  )
}

const WeatherIcon = ({icon}) => {
  const url = String(`https://openweathermap.org/img/wn/${icon}@2x.png`)
  return <img src={url}/>
}

const WeatherInfo = ({weatherData}) => {
  if (!weatherData) {
    return null
  }
  return(
    <div>
      <h3>Weather in {weatherData.name}</h3>
      <p>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
      <WeatherIcon icon={weatherData.weather[0].icon}/>
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    countryService
    .getAll()
    .then(countryData => {setCountries(countryData)})
  }, [])

  return(
    <div>
      <div>find countries
        <input 
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <Fetch countries={countries} 
                search={search} 
                setSearch={setSearch} 
                setWeather={setWeather}/>
      </div>
      <div>
        <WeatherInfo weatherData={weather}/>
      </div>
    </div>
  )

}

export default App
