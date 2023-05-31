import axios from 'axios'

const get = name => {
  const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
  return request.then(response => response.data)
}

const countryService = { get, getAll }

export default countryService