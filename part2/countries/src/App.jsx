import './App.css'
import {useEffect, useState} from "react"
import countriesService from './services/countries'
import CountriesList from "./components/CountriesList"
import SearchFilter from "./components/SearchFilter"

function App() {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        countriesService.getAll().then(initialCountries => {
            setCountries(initialCountries)
        })
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

  return (
    <>
        <SearchFilter filter={filter} handleFilterChange={handleFilterChange} />
        <CountriesList countries={countries} filter={filter} />
    </>
  )
}

export default App
