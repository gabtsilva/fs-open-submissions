const PersonsList = ({persons, searchFilter}) => {
    return(
        <div>
            {persons.filter(person => person.name.includes(searchFilter)).map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
    )
}

export default PersonsList