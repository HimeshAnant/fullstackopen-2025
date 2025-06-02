import { useState, useEffect } from 'react'

import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const DisplayCountryLanguages = ({ country }) => {
  return (
      <ul>
        {Object.values(country.languages).map( language => 
          <li key={language}>{language}</li>
        )}
      </ul>
  )
}

const DisplayWeather = ({ country, weatherCountry, setWeatherCountry }) => {
  if (weatherCountry === null) return null
  else if (weatherCountry[country.cca3] === null) {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
    .then( promise => {
      setWeatherCountry({...weatherCountry, [country.cca3]:promise.data})
    } )

    return null
  }

  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      <div>
        <p>
          Temperature {(weatherCountry[country.cca3].main.temp - 273.15).toFixed(2)} Celsius
        </p>
        <br/>
        <img 
          src={`https://openweathermap.org/img/wn/${weatherCountry[country.cca3].weather[0].icon}@2x.png`} 
          alt="image depicting weather" 
        />
        <p>
          Wind {weatherCountry[country.cca3].wind.speed} m/s
        </p>
      </div>
    </div>
  )
}

const DisplayCountry = ({ country, weatherCountry, setWeatherCountry }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>

      <h2>Languages</h2>
      <DisplayCountryLanguages country={country} />
      <img src={country.flags.png} alt='image of countries map' />

      <DisplayWeather country={country} weatherCountry={weatherCountry} setWeatherCountry={setWeatherCountry}/>
    </div>
  )
}

const DisplayCountries = ({ allCountries, newCountry, setNewCountry, showCountries, setShowCountries, weatherCountry, setWeatherCountry }) => {
  if (newCountry === "") return null
  if (allCountries.length === 0) return null

  const filteredCountries = allCountries.filter( country =>  country.name.common.toLowerCase().includes( newCountry.toLowerCase() ))

  if (filteredCountries.length > 10) return <div>Too many countries to show</div>
  else if (filteredCountries.length === 0) return <div>Couldn't find any country</div>
  else if (filteredCountries.length === 1) return <DisplayCountry country={filteredCountries[0]} weatherCountry={weatherCountry} setWeatherCountry={setWeatherCountry}/>

  const handleButtonClick = ( country ) => {
    return ( event ) => {
      setShowCountries({...showCountries, [country.cca3]:!showCountries[country.cca3]})
    }
  }
  return (
    <div>
      {filteredCountries.map( (country)=> 
        <div key={country.name.common}>
          <span>{country.name.common}</span>
          <button type='submit' onClick={handleButtonClick(country)}>{showCountries && showCountries[country.cca3]? 'hide' : 'show'}</button>
          {showCountries && showCountries[country.cca3] ? <DisplayCountry country={country} weatherCountry={weatherCountry} setWeatherCountry={setWeatherCountry}/> : null}
        </div>
       )}
    </div>
  )
}

const App = () => {
  const [newCountry, setNewCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [showCountries, setShowCountries] = useState(null)
  const [weatherCountry, setWeatherCountry] = useState(null)

  useEffect( () => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then( promise => {
      setAllCountries(promise.data)
      setShowCountries(Object.fromEntries(
        promise.data.map( (country) => [country.cca3, false] )
      ))
      setWeatherCountry(Object.fromEntries(
        promise.data.map( (country) => [country.cca3, null] )
      ))
    } )
  }, [])

  const handleInputChange = (event) => {
    setNewCountry(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        find countries <input value={newCountry} onChange={handleInputChange}/>
      </form>

      <DisplayCountries 
      allCountries={allCountries} newCountry={newCountry} setNewCountry={setNewCountry}
      showCountries={showCountries} setShowCountries={setShowCountries} 
      weatherCountry={weatherCountry} setWeatherCountry={setWeatherCountry}/>

    </div>
  )
}

export default App