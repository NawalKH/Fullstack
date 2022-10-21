import React from 'react'
import Person from './Person'

const Persons = ({personsList, filter, deletePerson}) => {

const searchValue = filter.toLowerCase()
const personsToShow = personsList.filter (person => person.name.toLowerCase().includes(searchValue))

  return (
  <div>
  { personsToShow.map(person =>
  <div key={person.name}> 
  <Person person={person} /> 
  <button onClick={()=>deletePerson(person)}>delete</button>
  </div> 
  )}
  </div>
  )
}

export default Persons