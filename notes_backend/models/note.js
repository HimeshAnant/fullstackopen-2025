const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

uri = process.env.MONGODB_URI

console.log("connecting to", uri)
mongoose.connect(uri)
    .then( result => {
        console.log("connected to MongoDB")
    } )
    .catch( error => {
        console.log('error connecting to MongoDB: ', error.message)
    } )

const noteSchema = mongoose.Schema({
    content: String,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)