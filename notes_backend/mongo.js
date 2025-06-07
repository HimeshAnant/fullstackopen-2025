const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://himeshanant651:${password}@cluster0.gcly8zq.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*
const note = new Note({
    content: "I got exposed to diving by Deep Blue, an anime",
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    console.log(result)
    mongoose.connection.close()
})
*/

Note.find({}).then(result => {
    result.forEach( (note => {
        console.log(note)
    }) )
    mongoose.connection.close()
})
