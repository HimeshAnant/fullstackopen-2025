import { useState } from 'react'
import axios from 'axios'

const BlogDetail = ({ user, blog, blogs, setBlogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,

    border: 'solid',
    borderWidth: 1,

    backgroundColor: 'lightGrey',

    marginBottom: 5,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 2,
  }

  const handleLikeClick = async () => {
    await axios
      .put(`/api/blogs/${blog.id}`)

    const newBlogs = blogs.map(e =>
      e.id === blog.id
        ? { ...blog, likes: blog.likes+1 }
        : e
    )

    setBlogs(newBlogs.sort((blogA, blogB) =>
      blogB.likes - blogA.likes
    ))
  }

  const showDelete = { display: user.username === blog.user.username ? '' : 'none' }

  const handleDelete = async () => {
    if (!window.confirm(`delete ${blog.title}`)) {
      return
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    }

    await axios.delete(`/api/blogs/${blog.id}`, config)
    setBlogs(blogs.filter(e =>
      e.id !== blog.id
    ))
  }

  return (
    <div style={blogStyle} data-testid='blogDetail'>
      <a href='https://google.com' target="_blank" rel="noopener noreferrer">{blog.url}</a>

      <div>
        <span data-testid='like-count'>likes: {blog.likes}</span>
        <button onClick={handleLikeClick}>like</button>
      </div>

      {user.name}

      <div style={showDelete}>
        <button onClick={handleDelete}>remove</button>
      </div>

    </div>
  )
}

const Blog = ({ user, blog, blogs, setBlogs }) => {
  const [visibility, setVisibility] = useState(false)

  const buttonLabel = (visibility ? 'hide' : 'show' )

  return (
    <div data-testid='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setVisibility(!visibility)}>{buttonLabel}</button>

      {
        visibility
          ? <BlogDetail user={user} blog={blog} blogs={blogs} setBlogs={setBlogs} />
          : null
      }

    </div>
  )
}

export default Blog