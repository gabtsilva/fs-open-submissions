import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PersonsList from './components/PersonsList';
import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchFilter, setSearchFilter] = useState('')

    useEffect(() => {
        personService.getAll().then(initialPersons => {
            setPersons(initialPersons)
        })
    }, []);

    const deletePerson = (name) => {
        const person = persons.find(person => person.name === name)
        if (window.confirm(`Delete ${person.name}?`)) {
            personService.deletePerson(person.id).then((newArray) => {
                setPersons(newArray);
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const personExists = persons.find(person => person.name === newName)
        if (personExists) {
            if (window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)) {
                personService.update(personExists.id, { name: newName, number: newNumber }).then((newPerson) => {
                    setPersons(persons.map(person => person.id !== newPerson.id ? person : newPerson));
                })
            }

        }else{
            personService.create({ name: newName, number: newNumber }).then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewNumber('')
            })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={searchFilter} setFilter={(event) => setSearchFilter(event.target.value)} />
            <h2>Add a new number</h2>
            <Form handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
            <h2>Numbers</h2>
            <PersonsList persons={persons} searchFilter={searchFilter} deletePerson={deletePerson} />
        </div>
    )
}

export default App