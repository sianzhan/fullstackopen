import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Filter = ({ searchTerm, handleSearchTermChange }) => (
  <div>find countries <input value={searchTerm} onChange={handleSearchTermChange} /></div>
)

const Message = ({ message }) => <div>{message}</div>

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
      <div>capital {country.capital.join(', ')}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt}></img>
    </div>
  )
}

const Countries = ({ countries, searchTerm }) => {
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
      <CountryInfo
        country={filteredCountries[0]}
      />
    )
  }
  else if (filteredCountries.length <= 10) {
    return (
      filteredCountries
      .map(country => country.name.common)
      .sort((a, b) => a.localeCompare(b))
      .map(name => <div key={name}>{name}</div>)
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
      />
    </div>
  )
}

export default App;
