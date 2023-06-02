require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('post-data', function (req, res) { return (req.method == 'POST') ? JSON.stringify(req.body) : '' })

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))
app.use(express.json())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        response.json(persons)
      } else {
        response.status(404).end()
      }
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
})

app.post('/api/persons', (request, response) => {
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
    .catch(error => {
      if (error.code === 11000) {
        response.status(400).json({
          error: "name must be unique"
        })
      } else {
        console.error('An unexpected error occurred:', error);
      }
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const personIndex = persons.findIndex(person => person.id === id)

  if (personIndex === -1) {
    return response.status(404).json({ error: 'Person not found' })
  }

  persons.splice(personIndex, 1)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p>`
  const date = `<p>${new Date()}</p>`
  const combined = info + date
  response.send(combined)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})