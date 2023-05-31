import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/openweathermap'

const Filter = ({ searchTerm, handleSearchTermChange }) =>
  <div>find countries <input value={searchTerm} onChange={handleSearchTermChange} /></div>

const Message = ({ message }) => <div>{message}</div>

const WeatherInfo = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    weatherService.getWeather(cityName)
      .then(response => setWeatherData(response))
  }, [cityName]);

  if (!weatherData) return

  const temp = weatherData.main.temp
  const weatherDescription = weatherData.weather[0].description
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
  const windSpeed = weatherData.wind.speed

  return (
    <div>
      <h1>
        Weather in {cityName}
      </h1>
      <div>temperature {temp} Celcius</div>
      <img src={weatherIconUrl} alt={weatherDescription}></img>
      <div>wind {windSpeed} m/s</div>
    </div>
  )
}

const CountryInfo = ({ country }) => {
  const name = country.name.common
  const capital = country.capital[0]
  const area = country.area
  const languages = country.languages
  const flagUrl = country.flags.png
  const flagAlt = country.flags.alt

  return (
    <div>
      <h1>
        {name}
      </h1>
      <div>capital {capital}</div>
      <div>area {area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <img src={flagUrl} alt={flagAlt}></img>

      <WeatherInfo cityName={capital} />
    </div>
  )
}

const Countries = ({ countries, searchTerm, setSearchTerm }) => {
  const searchTermLowerCase = searchTerm.toLowerCase()
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTermLowerCase))

  if (!searchTerm) return

  if (filteredCountries.length === 0) {
    return (
      <Message message="No match, specify another filter" />
    )
  }
  else if (filteredCountries.length === 1) {
    return (
      <CountryInfo country={filteredCountries[0]} />
    )
  }
  else if (filteredCountries.length <= 10) {
    return (
      filteredCountries
        .map(country => country.name.common)
        .sort((countryNameA, countryNameB) => countryNameA.localeCompare(countryNameB))
        .map(countryName =>
          <div key={countryName}>
            {countryName} <button type="submit" onClick={() => setSearchTerm(countryName)}>show</button>
          </div>)
    )
  }
  else {
    return (
      <Message message="Too many matches, specify another filter" />
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    countryService.getAll().then(countries => setCountries(countries))
  }, [])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <Filter
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />

      <Countries
        countries={countries}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  )
}

export default App;
