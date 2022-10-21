import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const found = persons.find(person => newName === person.name)
    if (found !== undefined) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        personService
        .update(found.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== found.id ? p : returnedPerson))
          setMessage(`Updated '${returnedPerson.name}' number`)
          setMessageStyle('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(`'${found.name}' has already been removed from server`)
          setPersons(persons.filter(p => p.id !== found.id))
          setMessageStyle('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added '${returnedPerson.name}'`)
          setMessageStyle('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })    
    }

    setNewName('')
    setNewNumber('')
  }

  
  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name}?`)){
      personService.deleteObject(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const search = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} style={messageStyle}/>

      <Filter value={filter} handleChange={search} />

      <h3>Add a new</h3>

      <PersonForm
        submitPerson={addPerson}
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsList={persons} filter={filter} deletePerson={deletePerson} />
    </div>


  )
}

export default App