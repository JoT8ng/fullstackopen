import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/country'


const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState({})
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log('useEffect has started, search is now', search);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${search}`);
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCountries([]);
      }
    };
  
    if (search) {
      fetchData();
    }
  }, [search]);  

  const handleSearchChange = (event) => {
    console.log('search field', event.target);
    setSearch(event.target.value);
  }

  const handleCountryVisible = (event) => {
    setVisible(!visible);
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      {countries.length === 1 && <Country countries={countries[0]} />}
      {countries.length > 1 && countries.length <= 10 && (
        <div>
          {countries.map(country => (
            <div key={country.name.common}>
              <p>{country.name.common}</p>
              <button onClick={handleCountryVisible}>show</button>
              {visible && <Country countries={country} />}
            </div>
          ))}
        </div>
      )}
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
    </div>
  )
}

export default App;