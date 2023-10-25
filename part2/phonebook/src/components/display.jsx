import React from 'react'
import Person from './person'


const Display = ({ persons, filterPerson, handleDelete }) => {
    return (
      <ul>
        {filterPerson.map((person, i) => 
          <Person key={i} person={person} handleDelete={handleDelete} />
        )}
      </ul>
    )
}

export default Display;