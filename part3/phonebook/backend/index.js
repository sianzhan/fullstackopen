const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(morgan('tiny'))
app.use(express.json())

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  let error = ''

  if (!body) error = 'body is missing'
  else if (!body.name) error = "name can't be empty"
  else if (!body.number) error = "number can't be empty"
  else if (persons.find(person => person.name === body.name)) error = "name must be unique"

  if (error) {
    return response.status(400).json({
      error: error
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})