const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token("postData", (request, response) => {
    if (request.method !== 'POST') return ""
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`
        <p>phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find( person => person.id === id )

    if (!person) {
        return response.status(404).end()
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter( person => person.id !== id )

    response.status(204).end()
})


const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map( person => person.id ))
        : 0
    
    return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
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

    const notUniqueName = persons.find( person => person.name === body.name )
    if (notUniqueName) {
        return response.status(409).json({
            error: `${body.name} already exists`
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)

    response.status(201).json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

const unknownEndpoint = (request, response, next) => {
    response.status(404).json({error: "unknown endpoint"})
    next()
}

app.use(unknownEndpoint)