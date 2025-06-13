const _ = require('lodash')

const dummy = (blogs) => 1

const likeSum = (blogs) => {
  const reducer = (totalLikes, blog) => {
    return totalLikes + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : _.maxBy(blogs, 'likes')
}

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? {}
    : _.chain(blogs)
      .maxBy('likes')
      .pick(['author', 'likes'])
      .value()
}

module.exports = {
  dummy,
  likeSum,
  favoriteBlog,
  mostBlogs,
}