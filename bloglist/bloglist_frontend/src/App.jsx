import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import BlogForm from './components/BlogForm'
import DisplayBlogs from './components/DisplayBlogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'


const LoginPage = ({ setUser }) => {
  const [error, setError] = useState(null)
  return (
    <div>
      <h1>Login</h1>
      <Notification message={error} color={'red'} />
      <LoginForm setUser={setUser} setError={setError} />
    </div>
  )
}

const BlogPage = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get('/api/blogs')
      const fetchedBlogs = response.data
      setBlogs(fetchedBlogs.sort((blogA, blogB) =>
        blogB.likes - blogA.likes
      ))
    }

    fetchBlogs()
  }, [])

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('blogAppUserData')
  }

  const createNewBlog = async (newBlog) => {
    try
    {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      }
      const response = await axios.post('/api/blogs', newBlog, config)

      const newBlogs = blogs.concat(response.data)
      setBlogs(newBlogs.sort((blogA, blogB) =>
        blogB.likes - blogA.likes
      ))

      setMessage(`a new blog '${newBlog.title}' by '${newBlog.author}' added`)
      setTimeout(() => setMessage(null), 5000)
    }
    catch(exception)
    {
      console.log(exception.message)
      setError('error posting blog')

      setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} color={'green'} />
      <Notification message={error} color={'red'} />
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>logout</button>
      </div>

      <h1>create new</h1>
      <Togglable buttonLabel={'add Blog'} ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>

      <DisplayBlogs user={user} blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogAppUserData')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  }, [])

  return (
    <div>
      {
        user === null
          ? <LoginPage setUser={setUser} />
          : <BlogPage user={user} setUser={setUser} />
      }
    </div>
  )
}

export default App