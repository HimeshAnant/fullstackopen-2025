import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }

    createNewBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder='enter title'
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder='enter author'
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder='enter url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm