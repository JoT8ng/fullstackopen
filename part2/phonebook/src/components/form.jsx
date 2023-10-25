import React from 'react'


const Form = ({ onSubmit, newName, handleNameSubmit, newNumber, handleNumberSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameSubmit} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberSubmit}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form;