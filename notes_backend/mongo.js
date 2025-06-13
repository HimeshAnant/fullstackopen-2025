require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy!',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  console.log(result)
  mongoose.connection.close()
})

/*
Note.find({}).then(result => {
  result.forEach((note => {
    console.log(note)
  }))
  mongoose.connection.close()
})
*/