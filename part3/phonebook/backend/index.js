require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('post-data', function (req, res) { return (req.method == 'POST') ? JSON.stringify(req.body) : '' })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))


app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        response.json(persons)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  let error = ''

  if (!body) error = 'body is missing'
  else if (!body.name) error = "name can't be empty"
  else if (!body.number) error = "number can't be empty"

  if (error) {
    return response.status(400).json({
      error: error
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const person = request.body

  let error = ''

  if (!person) error = 'body is missing'
  else if (!person.name) error = "name can't be empty"
  else if (!person.number) error = "number can't be empty"

  if (error) {
    return response.status(400).json({
      error: error
    })
  }

  Person.findByIdAndUpdate(id, person, { new: true })
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(person => {
      if (person) {
        response.status(204).end()
      }
      else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p>`
  const date = `<p>${new Date()}</p>`
  const combined = info + date
  response.send(combined)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(JSON.stringify(error))

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(400).send({ error: `duplicated key: ${Object.keys(error.keyPattern)}` })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})