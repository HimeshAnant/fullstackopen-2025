const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.user)
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const newBlog = new Blog({ ...request.body, user: user.id })

  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  if (request.user.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  const user = await User.findById(request.user)
  user.blogs = user.blogs.filter(e => e.id.toString() !== blog.id.toString())

  await blog.deleteOne()
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const receivedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
  if (!receivedBlog) {
    return response.status(404).end()
  }
  response.json(receivedBlog)
})

module.exports = blogsRouter