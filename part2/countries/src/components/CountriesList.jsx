import ShowDetailsButton from "./ShowDetailsButton"
import Weather from "./Weather.jsx";
const CountriesList = ({countries, filter}) => {
    const filteredCountries = countries.filter(country => country.name.common.includes(filter))
    if(filteredCountries.length > 10){
        return (
            <p>Too many matches, specify another filter</p>
        )
    }else if(filteredCountries.length === 1){
        const country = filteredCountries[0]
        return (
            <>
                <h2>Country name: {country.name.common}</h2>
                <p>Capital: {country.capital[0]}</p>
                <p>Population:  {country.population}</p>
                <h3>Languages</h3>
                <ul>
                    {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.name.common} width="100" height="auto"/>
                <Weather capital={country.capital[0]} latitude={country.latlng[0]} longitude={country.latlng[1]} />
            </>
        )
    }else{
        return (
            <>
                {filteredCountries.map(country => <p key={country.name.common}>
                    {country.name.common}
                    <br/>
                    <ShowDetailsButton country={country.name.common} />
                </p>)}
            </>
        )
    }
}
export default CountriesList