require('dotenv').config()
const Blog = require('./models/blog')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('let\'s get to deleting')
    Blog.deleteMany({})
      .then(() => {
        mongoose.connection.close()
        console.log('program ended')
      })
  })
  .catch(error => {
    console.log(error.message)
  })
