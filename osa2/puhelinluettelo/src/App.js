import { useState } from 'react'

const Person = (props) => {
  return <p>{props.name} {props.number}</p>
}

const Fetch = ({persons, showAll, search}) => {
  const personsToShow = showAll
  ? persons
  : persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    personsToShow.map(person =>
    <Person key={person.name} name={person.name} number={person.number}/>
    ))}

const Form = (props) => {
  return(
  <form onSubmit={props.addPerson}>
  <div>
    name:
    <input
      value={props.newName}
      onChange={props.handleNameChange}
    />
  </div>
  <div>number: 
    <input
      value={props.newNumber}
      onChange={props.handleNumberChange}
   />
   </div>
  <div>
    <button type="submit">add</button>
  </div>
  </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleSearchChange = (event) => {
    setShowAll(false)
    setSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name===newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>Filter shown with
        <input 
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <h2>Add a new</h2>
      </div>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Fetch persons={persons} showAll={showAll} search={search} />
    </div>
  )

}

export default App