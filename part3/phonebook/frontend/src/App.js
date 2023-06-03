import { useState, useEffect } from 'react'
import personService from './services/persons'

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    const isPersonExisting = existingPerson !== undefined

    if (isPersonExisting) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          name: existingPerson.name,
          number: newNumber,
          id: existingPerson.id
        }

        personService
          .update(personObject)
          .then(returnedPerson => {
            setPersons([...persons.filter(person => person !== existingPerson), returnedPerson])
            setNewName('')
            setNewNumber('')

            setSuccessMessage(`Changed ${returnedPerson.name}`)
            setTimeout(() => { setSuccessMessage(null) }, 5000)
          })
          .catch(error => {
            if (error.response) {
              setErrorMessage(error.response.data.error)
            } else {
              setErrorMessage(error.message)
            }
            setTimeout(() => { setErrorMessage(null) }, 5000)
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson])
          setNewName('')
          setNewNumber('')

          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => { setSuccessMessage(null) }, 5000)
        })
        .catch(error => {
          if (error.response) {
            setErrorMessage(error.response.data.error)
          } else {
            setErrorMessage(error.message)
          }
          setTimeout(() => { setErrorMessage(null) }, 5000)
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
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

      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />

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