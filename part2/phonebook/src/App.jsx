import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PersonsList from './components/PersonsList';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchFilter, setSearchFilter] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/persons')
            .then(response => response.json())
            .then(data => setPersons(data))
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        const personExists = persons.find(person => person.name === newName)
        if (personExists) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        setPersons(persons.concat({ name: newName, number: newNumber }))
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={searchFilter} setFilter={(event) => setSearchFilter(event.target.value)} />
            <h2>Add a new number</h2>
            <Form handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
            <h2>Numbers</h2>
            <PersonsList persons={persons} searchFilter={searchFilter} />
        </div>
    )
}

export default App