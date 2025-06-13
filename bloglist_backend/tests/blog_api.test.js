const { test, describe, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('gets all blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs have id attr', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert(response.body.every(blog => 'id' in blog))
})

describe('adding valid blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'The Art of Writing Clean Code',
      author: 'Uncle Bob',
      url: 'https://clean-code.dev/basic-principles',
      likes: 256
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getAllBlogs()
    const content = blogsAtEnd.map(blog => blog.title)
    assert(content.includes(newBlog.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })

  test('adding blog without likes defualts to likes being 0', async () => {
    const newBlog = {
      title: 'The Art of Writing Clean Code',
      author: 'Uncle Bob',
      url: 'https://clean-code.dev/basic-principles',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getAllBlogs()
    const createdBlog = blogsAtEnd.find(blog => blog.id === response.body.id)

    assert(createdBlog)
    assert.strictEqual(createdBlog.likes, 0)

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })
})

describe('adding blogs with missing fileds', () => {
  test('adding blog without title throws 400', async () => {
    const newBlog = {
      author: 'Uncle Bob',
      url: 'https://clean-code.dev/basic-principles',
      likes: 50,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.getAllBlogs()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('adding blog without author throws 400', async () => {
    const newBlog = {
      title: 'The Art of Writing Clean Code',
      url: 'https://clean-code.dev/basic-principles',
      likes: 50,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.getAllBlogs()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('adding blog without url throws 400', async () => {
    const newBlog = {
      title: 'The Art of Writing Clean Code',
      author: 'Uncle Bob',
      likes: 50,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.getAllBlogs()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})


describe('deleting blog', () => {
  test('deleting an existing blog returns 204', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.getAllBlogs()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map(blog => blog.title)
    assert(!title.includes(blogToDelete.title))
  })
})

describe('updating blog', () => {
  test('updating all of attributes valid blog gives 200', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const blogToUpdate = blogsAtStart[0]

    const update = {
      title: 'let\' see',
      author: 'dunno',
      url: 'happy birthday billl',
      likes: 555,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(200)

    const blogsAtEnd = await helper.getAllBlogs()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes(update.title))
  })

  test('updating blog that doesn\'t exist throws 404', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const blogToUpdateId = await helper.nonExistingId()

    const update = {
      title: 'let\' see',
      author: 'dunno',
      url: 'happy birthday billl',
      likes: 555,
    }

    await api
      .put(`/api/blogs/${blogToUpdateId}`)
      .send(update)
      .expect(404)

    const blogsAtEnd = await helper.getAllBlogs()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test('updating few of attributes valid blog gives 200', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const blogToUpdate = blogsAtStart[0]

    const update = {
      title: 'let\' see',
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(200)

    const blogsAtEnd = await helper.getAllBlogs()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes(update.title))
  })
})

after(async () => {
  await mongoose.connection.close()
})