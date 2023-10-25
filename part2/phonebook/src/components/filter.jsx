import React from 'react'


const Filter = ({ value, setSearch }) => {
    return (
      <div>
        Filter shown with: <input value={value} onChange={(e) => setSearch(e.target.value)} />
      </div>
    )
}

export default Filter;