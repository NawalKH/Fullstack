import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({ weatherData }) => {

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  }

  return (
    <div>
      {weatherData.cod === 200 ?
        <div>
          <div>temperature {kelvinToFarenheit(weatherData.main.temp)} Celcius</div>
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt='icon'/>
          <div>wind {weatherData.wind.speed} m/s </div>
        </div>
        : null
      }
    </div>
  )
}

const Country = ({ country }) => {

  const [weatherData, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`

  useEffect(() => {
    axios
      .get(api_url)
      .then(response => {
        setWeather(response.data)
      })
  }, [api_url])


  return (
    <div>
      <h2>{country.name.common} </h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <h4>langauges</h4>
      <ul>
        {Object.values(country.languages).map(val => <li key={val}> {val} </li>)}
      </ul>
      <img src={country.flags.png} alt='flag' />

      <h3>Weather in {country.capital}</h3>
      <Weather weatherData={weatherData} />

    </div>
  )
}



const Countries = ({ countries, filter, setCountry }) => {

  const searchValue = filter.toLowerCase()
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchValue))

  if (filteredCountries.length > 10)
    return (
      <div>Too many matches, specify another filter</div>
    )
  else if (filteredCountries.length > 1 && filteredCountries.length <= 10)
    return (
      <div>
        {filteredCountries.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setCountry(country.name.common)}>
              show </button>
          </div>)}
      </div>
    )
  else if (filteredCountries.length === 1)
    return (
      <div>
        <Country country={filteredCountries[0]} />
      </div>
    )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const search = (event) => setFilter(event.target.value)
  const setCountry = (props) => setFilter(props)


  return (
    <div>
      find countries
      <input value={filter} onChange={search} />

      <Countries countries={countries} filter={filter} setCountry={setCountry} />
    </div>
  )
}

export default App