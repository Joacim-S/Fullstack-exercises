import { useState, useEffect } from 'react'
import contactService from './services/contacts'

const Person = (props) => {
  return <p>{props.name} {props.number} <button onClick={props.yeet}>delete</button></p>
}

const Notification = ({message, error}) => {
  const notificationStyle = {
    color: 'green',
    fontSize: 24,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (error) {notificationStyle.color = 'red'}
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const Fetch = ({persons, showAll, search, yeeter}) => {
  const personsToShow = showAll
  ? persons
  : persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    personsToShow.map(person =>
    <Person key={person.id} 
    name={person.name}
    number={person.number}
    yeet={() => {yeeter(person.id, person.name)}
    }
    />
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null)
  const [errorStatus, setErrorStatus] = useState(false)
  const timer = () => setTimeout(() => {
    setErrorStatus(false)
    setNotification(null)
  }, 5000
  )
  

  useEffect(() => {
        contactService
        .getAll()
        .then(initialPersons => {setPersons(initialPersons)})
  }, [])
  
  const yeetPerson = (id, name) => {
    if (window.confirm('delete ' + name))
    {
    contactService
    .yeetPerson(id)
    setPersons(persons.filter((person) => person.id !== id))
    setNotification(`Deleted ${name}`)
    timer()
    }
  }

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
    const personObject = {
      name: newName,
      number: newNumber
    }
    event.preventDefault()
    const old = persons.find(person => person.name===newName)
    if (old) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number witha new one?`))
      {
        contactService
        .replace(personObject, old.id)
        .then(response => {
        setPersons(persons.map(person => person.id !== old.id ? person : response))
        setNotification(`Updated ${newName}`)
        timer()
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorStatus(true)
        setPersons(persons.filter((person) => person.id !== old.id))
        setNotification(`${newName} was already deleted from the server`)
        timer()
        setNewName('')
        setNewNumber('')
        return
      })
      }
      return
    }
    contactService
      .addNew(personObject)
        .then(response => setPersons(persons.concat(response)))
        setNotification(`Added ${newName}`)
        timer()
        setNewName('')
        setNewNumber('') 
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} error={errorStatus} />
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
      <Fetch persons={persons} showAll={showAll} search={search} yeeter={yeetPerson}/>
    </div>
  )

}

export default App
