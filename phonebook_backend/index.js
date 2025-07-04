require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token("postData", (request, response) => {
    if (request.method !== 'POST') return ""
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))


app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then( persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.send(`
                <p>phonebook has info for ${persons.length} people</p>
                <p>${Date()}</p>
            `)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then( person => {
            if (person) {
                response.json(person)
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then( savedPerson => {
            response.status(202).json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
    .then(person => {
        if (!person) {
            return response.status(404).json({ error: 'person not found' })
        }

        person.name = name
        person.number = number

        return person.save().then(updatedPerson => {
            response.json(updatedPerson)
        })
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('server is running on PORT: ', PORT)
})

const unknownEndpoint = (request, response, next) => {
    response.status(404).json({error: "unknown endpoint"})
    next()
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: 'malformat id' })
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message})
    }

    next(error)
}

app.use(errorHandler)