import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PersonsList from './components/PersonsList';
import personService from './services/persons';
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchFilter, setSearchFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [type, setType] = useState('')

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
                setErrorMessage(`${person.name} was deleted`)
                setType('success')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const personExists = persons.find(person => person.name === newName)
        if (personExists) {
            if (window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)) {
                personService.update(personExists.id, { name: newName, number: newNumber }).then((newPerson) => {
                    console.log(newPerson);
                    setPersons(persons.map(person => person.id !== newPerson.id ? person : newPerson));
                    setErrorMessage(`${personExists.name} was updated`)
                    setType('success')
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                }).catch(error => {
                    console.log(error);
                    setErrorMessage(`${personExists.name} was already removed from server`)
                    setType('error')
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
            }

        }else{
            personService.create({ name: newName, number: newNumber }).then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewNumber('')
                setErrorMessage(`${newPerson.name} was added`)
                setType('success')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} type={type}/>
            <Filter filter={searchFilter} setFilter={(event) => setSearchFilter(event.target.value)} />
            <h2>Add a new number</h2>
            <Form handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
            <h2>Numbers</h2>
            <PersonsList persons={persons} searchFilter={searchFilter} deletePerson={deletePerson} />
        </div>
    )
}

export default App