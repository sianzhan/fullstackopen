import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ searchTerm, handleSearchTermChange }) => (
  <div>filter shown with <input value={searchTerm} onChange={handleSearchTermChange} /></div>
)

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => (
  <form onSubmit={addPerson}>
    <div>name: <input value={newName} onChange={handleNameChange} /></div>
    <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

const Persons = ({ persons, searchTerm, deletePerson }) => {
  const searchTermLowerCase = searchTerm.toLowerCase()
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTermLowerCase)
  )

  return (
    filteredPersons.map(person =>
      <div key={person.id}>
        {person.name} {person.number} <button type="submit" onClick={() => deletePerson(person)}>delete</button>
      </div>
    ))
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const isDuplicate = persons.some(person => person.name === newName)

    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        searchTerm={searchTerm}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App