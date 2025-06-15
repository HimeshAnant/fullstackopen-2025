import { useState, useEffect } from 'react'
import axios from 'axios'


const handleInputChange = (setVar) => {
  return ({ target }) => setVar(target.value)
}

const getNotificationStyle = (color) => {
  const style = {
    color: color,
    background: 'lightGrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return style
}

const DisplayErrorMessage = ({ error }) => {
  if (error === null){
    return null
  }

  return (
    <p style={getNotificationStyle('red')}>{error}</p>
  )
}

const DisplaySuccessMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <p style={getNotificationStyle('green')}>{message}</p>
  )
}

const Login = ({ username, setUsername, password, setPassword, setUser, error, setError }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = { username, password }
    let loggedUser = null
    try
    {
    loggedUser = await axios
      .post('/api/login', user)
    }
    catch(exception)
    {
      setError('wrong username or password')
      setUsername('')
      setPassword('')

      setTimeout(() => setError(null), 5000)
    }

    if (loggedUser) {
      setUsername('')
      setPassword('')
      setUser(loggedUser.data)
      window.localStorage.setItem('blogAppUserData', JSON.stringify(loggedUser.data))
    }
  }

  return (
    <div>
      <h1>Log in to application</h1>
      <DisplayErrorMessage error={error} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleInputChange(setUsername)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handleInputChange(setPassword)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


const DisplayUserBlogs = ({ blogs }) => {
  const titleStyle = {
    margin: 1,
    font: 16,
  }

  return (
    <div>
      {blogs.map(blog => 
          <p key={blog.id} style={titleStyle}>{blog.title} - {blog.author}</p>
        )}
    </div>
  )
}

const AddBlog = ({ user, title, setTitle, author, setAuthor, url, setUrl, message, setMessage }) => {
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }

    try
    {
      await axios.post('/api/blogs', newBlog, config)
      setTitle('')
      setAuthor('')
      setUrl('')

      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => setMessage(null), 5000)
    }
    catch(exception)
    {
      console.log('error in adding blog', exception)
    }
  }

  return (
    <div>
      <h1>create new</h1>
      <DisplaySuccessMessage message={message} />
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input 
            type="text"
            value={title}
            onChange={handleInputChange(setTitle)} 
          />
        </div>
        <div>
          author
          <input 
            type="text"
            value={author}
            onChange={handleInputChange(setAuthor)} 
          />
        </div>
        <div>
          url
          <input 
            type="text"
            value={url}
            onChange={handleInputChange(setUrl)} 
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const Blogs = ({ user, setUser, blogs, title, setTitle, author, setAuthor, url, setUrl, message, setMessage }) => {
  const handleLogOut = (event) => {
    setUser(null)
    window.localStorage.removeItem('blogAppUserData')
  }

  return (
    <div>
      <h1>Blogs</h1>
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>logout</button>
      </div>

      <AddBlog user={user} title={title} setTitle={setTitle} 
        author={author} setAuthor={setAuthor} url={url} 
        setUrl={setUrl} message={message} setMessage={setMessage}
      />

      <DisplayUserBlogs blogs={blogs} />
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    axios
      .get('/api/blogs')
      .then(response => setBlogs(response.data))
  }, [])

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
      ? <Login username={username} setUsername={setUsername} password={password} 
          setPassword={setPassword} setUser={setUser} error={error} 
          setError={setError}
        />
      : <Blogs user={user} setUser={setUser} blogs={blogs}
          title={title} setTitle={setTitle} author={author}
          setAuthor={setAuthor} url={url} setUrl={setUrl}
          message={message} setMessage={setMessage}
        />
    }
    </div>
  )
}

export default App