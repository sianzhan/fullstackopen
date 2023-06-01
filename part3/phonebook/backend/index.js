const express = require('express')
const app = express()

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