const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'title': 'Getting Started with React Hooks',
    'author': 'Jane Smith',
    'url': 'https://example.com/react-hooks-intro',
    'likes': 42
  },
  {
    'title': 'The Complete Guide to Node.js Authentication',
    'author': 'John Doe',
    'url': 'https://example.com/node-auth-guide',
    'likes': 128
  },
  {
    'title': 'CSS Grid vs Flexbox: When to Use Each',
    'author': 'Alex Johnson',
    'url': 'https://example.com/css-grid-flexbox',
    'likes': 76
  }
]

const initialUsers = [
  {
    username: 'ironwolf42',
    name: 'Derek Wolf',
    password: 'hunter2'
  },
  {
    username: 'skyline99',
    name: 'Aisha Rahman',
    password: 'blueSkies!'
  },
  {
    username: 'quietstorm',
    name: 'Lena Cho',
    password: 'tempest123'
  }
]

const getAllBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const getAllUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
  const note = new Blog({ title: 'title', author: 'author', url: 'url', likes: 0 })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

module.exports = {
  initialBlogs,
  getAllBlogs,
  nonExistingId,
  initialUsers,
  getAllUsers,
}