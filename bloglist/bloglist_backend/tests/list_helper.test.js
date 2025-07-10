const { test, describe } = require('node:test')
const assert = require('node:assert')
const _ = require('lodash')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)

  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.likeSum([]), 0)
  })

  test('of single blog equals like of that', () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'rul',
      likes: 50
    }

    assert.strictEqual(listHelper.likeSum([blog]), 50)
  })

  test('of many blogs is correct', () => {
    const blogs = [
      {
        title: 'title',
        author: 'author',
        url: 'rul',
        likes: 50
      },
      {
        title: 'title',
        author: 'author',
        url: 'rul',
        likes: 100
      },
      {
        title: 'title',
        author: 'author',
        url: 'rul',
        likes: 1000
      },
    ]

    assert.strictEqual(listHelper.likeSum(blogs), 1150)
  })
})

describe('favorite Blog', () => {
  test('of empty blogs returns empty', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), {})
  })

  test('of single blog returns same blog', () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'rul',
      likes: 50
    }

    assert.deepStrictEqual(listHelper.favoriteBlog([blog]), blog)
  })

  test('of many blogs returns highest liked', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
    ]

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
  })
})

describe('mostBlogs', () => {
  test('of empty blogs returns empty', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), {})
  })

  test('of single blog returns same blog', () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'rul',
      likes: 50
    }

    assert.deepStrictEqual(listHelper.mostBlogs([blog]), _.pick(blog, ['author', 'likes']))
  })

  test('of many blogs returns highest liked', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
    ]

    assert.deepStrictEqual(listHelper.mostBlogs(blogs), _.pick(blogs[2], ['author', 'likes']))
  })
})