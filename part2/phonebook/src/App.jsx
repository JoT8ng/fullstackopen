import { useState, useEffect } from 'react'
import Display from './components/display'
import Form from './components/form'
import Filter from './components/filter'
import Notification from './components/notification'
import phonebookService from './services/services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState(false)

  useEffect (() => {
    console.log('effect')
    phonebookService.getAll({ setPersons })
      .then(() => {
        console.log('received phonebook from backend');
      })
      .catch(error => {
        console.error('Error getting phonebook from backend:', error);
      });
  }, [])

  const handleNameSubmit = (event) => {
    console.log('button clicked', event.target);
    setNewName(event.target.value);
  }

  const handleNumberSubmit = (event) => {
    console.log('button clicked', event.target);
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const checkDuplicate = persons.find((person) => person.name === newName);
    if (checkDuplicate) {
      if (window.confirm(`${newName} is already added to phonebook. Would you like to update their phone number?`)) {
        const personToUpdate = persons.find(person => person.name === newName);
        const personObject = {
          name: newName,
          number: newNumber,
        };
        phonebookService.update(personToUpdate.id, personObject).then(() => {
          const updatedPersons = persons.map(person => person.id !== personToUpdate.id ? person : { ...person, number:newNumber });
          setPersons(updatedPersons);
          setError(`${newName}'s phonenumber has been successfully updated`);
          setTimeout(() => {
            setError(null)
          }, 5000);
          setMessage(true);
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      phonebookService.add({ setPersons, persons, setNewName, setNewNumber, personObject});
      setError(`${newName} has been successfully added`)
      setTimeout(() => {
        setError(null)
      }, 5000);
      setMessage(true);
    }
  }

  const handleDelete = (id) => {
    const deletePerson = persons.filter(person => person.id === id)
    const deletePersonName = deletePerson[0].name
    const deletePersonID = deletePerson[0].id
    if (window.confirm(`Are you sure you want to delete ${deletePersonName}?`)) {
      phonebookService.remove(id).then(() => {
      const updatedPersons = persons.filter(person => person.id !== deletePersonID);
      setPersons(updatedPersons);
      setError(`${newName} has been deleted`)
      setTimeout(() => {
        setError(null)
      }, 5000);
      setMessage(true)
      .catch(error => {
        console.error('Error removing person from backend:', error);
        setError(`Error deleting ${newName} from phonebook. ${newName} has already been deleted`)
        setTimeout(() => {
          setError(null)
        }, 5000);
        setMessage(false);
      })
      });
    }
  }

  const filterPerson = persons.filter((person) => 
  person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification error={error} message={message} />
      <Filter value={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <Form onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameSubmit={handleNameSubmit} handleNumberSubmit={handleNumberSubmit} />
      <h2>Numbers</h2>
      <ul>
        <Display persons={persons} filterPerson={filterPerson} handleDelete={handleDelete} />
      </ul>
    </div>
  )
}

export default App;