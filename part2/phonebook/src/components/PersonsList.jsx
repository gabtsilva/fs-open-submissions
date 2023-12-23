const PersonsList = ({persons, searchFilter, deletePerson}) => {
    return(
        <div>
            {persons.filter(person => person.name.includes(searchFilter)).map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => deletePerson(person.name)}>delete</button></div>)}
        </div>
    )
}

export default PersonsList