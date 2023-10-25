import axios from 'axios'


const baseURL = '/api/phonebook'

const getAll = ({ setPersons }) => {
  return axios
    .get(baseURL)
    .then(response => {
      console.log('received phonebook from backend');
      setPersons(response.data);
    })
}

const add = ({ setPersons, persons, setNewName, setNewNumber, personObject }) => {
    const request = axios.post(baseURL, personObject)
    return request.then(response => {
      setPersons(persons.concat(response.data));
      console.log('added new person to backend');
      setNewName('');
      setNewNumber('');
    })
    .catch(error => {
      console.error('Error adding new person to backend:', error);
    })
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/:${id}`)
    return request.then(response => {
      console.log('remove person from backend');
    })
    .catch(error => {
      console.error('Error removing person from backend:', error);
    })
}

const update = ({ id, personObject }) => {
    const request = axios.put(`${baseURL}/:${id}`, personObject)
    return request.then(response => {
      console.log('Updated phone number');
    })
    .catch(error => {
      console.error('Error updating phone number:', error);
    })
}

const phonebookService = {
  getAll,
  add,
  remove,
  update,
}

export default phonebookService;