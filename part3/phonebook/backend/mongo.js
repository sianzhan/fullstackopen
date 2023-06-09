const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
  console.log(`
  Usage:
  
  To show a list:
  node mongo.js <uri>
  
  To create a new entry:
  node mongo.js <uri> <name> <number>
  `)

  process.exit(1)
}

const uri = process.argv[2]

mongoose.set('strictQuery', false)
mongoose.connect(uri)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
      mongoose.connection.close()
    }
    )
  })
}