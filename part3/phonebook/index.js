const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config({ path: '.env.local' });
const Person = require('./models/model')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/phonebook', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  const currentDate = new Date().toLocaleString();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  Person.find({}).then(persons => {
    response.send(
      `<div>
        <p>Phonebook has info for ${persons.length} people</p>
      </div>
      <div>
        <p>${currentDate} ${timezone}</p>
      </div>`
    )
  })
  .catch(error => next(error))
})

app.get('/api/phonebook/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  })
  .catch(error => next(error))
})

app.delete('/api/phonebook/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(() => {
    response.status(204).end();
  })
  .catch(error => next(error))
})

app.post('/api/phonebook', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => savedPerson.toJSON())

  .catch(error => next(error))
})

app.put('/api/phonebook/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})