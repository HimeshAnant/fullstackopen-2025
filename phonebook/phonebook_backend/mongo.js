const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('password needs to be provided as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://himeshanant651:${password}@cluster0.gcly8zq.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

// allows filtering using attributes not present in schema
mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then( persons => {
        persons.forEach(person => {
            console.log(person)
        })

        mongoose.connection.close()
    } )
}
else {
    const name = process.argv[3]
    const number = process.argv[4]

    const newPerson = new Person({name, number})
    newPerson.save().then(person => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}