import { useState } from 'react'
import axios from 'axios'

const LoginForm = ({ setUser, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      console.log(exception.message)

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
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={event => setUsername(event.target.value)}
            placeholder='enter username'
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={event => setPassword(event.target.value)}
            placeholder='enter password'
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm