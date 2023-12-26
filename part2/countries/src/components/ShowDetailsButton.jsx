import countriesService from '../services/countries'
import {useState} from "react"
const ShowDetailsButton = ({country}) => {
    const [displayCountry, setDisplayCountry] = useState(null)
    const handleClick = (country) => {
        countriesService.getOne(country).then(data => {
            setDisplayCountry(data)
            console.log(data);
        })
    }
    return (
        <>
        <button onClick={() => handleClick(country)}>show</button>
            {displayCountry && <div>
            <h2>Country name: {displayCountry.name.common}</h2>
            <p>Capital: {displayCountry.capital[0]}</p>
            <p>Population:  {displayCountry.population}</p>
            <h3>Languages</h3>
            <ul>
                {Object.entries(displayCountry.languages).map(([key, value]) => <li key={key}>{value}</li>)}
            </ul>
            <img src={displayCountry.flags.png} alt={displayCountry.name.common} width="100" height="auto"/>
        </div>}
        </>
    )
}

export default ShowDetailsButton