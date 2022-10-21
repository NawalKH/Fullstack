import React from 'react'

const PersonForm = ({submitPerson, name, nameChange, number, numberChange}) => {
  return (
    <form onSubmit={submitPerson}>
        <div>
          name: <input 
          value={name}
          onChange={nameChange} />
        </div>
        <div>
          number: <input 
            value={number}
            onChange={numberChange} />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm