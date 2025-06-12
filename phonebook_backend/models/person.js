const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

uri = process.env.MONGODB_URI

console.log('connecting to url: ', uri)
mongoose.connect(uri)
    .then( result => {
        console.log('connected to MongoDB')
    })
    .catch( error => {
        console.log('error connecting to MongoDB: ', error.message)
    })


const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (val) => {
                const regex = /^\d{2,3}-\d+$/
                return regex.test(val)
            },
            message: 'number of incorrect format'
        }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)