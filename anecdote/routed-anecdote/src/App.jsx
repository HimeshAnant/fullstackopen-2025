import {
  Routes, Route, Link,
  useMatch,
  useNavigate,
} from 'react-router-dom'
import { useState } from 'react'

import { useField } from './hooks/index'


const Anecdotes = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>
        has {anecdote.votes} votes
      </div>

      <div>
        for more info see
        <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  )
}

const AnecdoteForm = ({ addAnecdote, setNotification }) => {
  const navigate = useNavigate()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const newAnecdote = {
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value
    }
    addAnecdote(newAnecdote)

    setNotification(`a new anecdote '${content.inputProps.value}' was created!`)
    setTimeout(() => setNotification(null), 5000)

    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>Create a new Anecdote</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          content<input { ...content.inputProps }/>
        </div>

        <div>
          author<input { ...author.inputProps } />
        </div>

        <div>
          url for more info<input { ...info.inputProps } />
        </div>

        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
  )
}

const Notification = ({ notification }) => {
  if (notification === null) return null

  return (
    <div>
      {notification}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const padding = {
    padding: 10
  }

  const addAnecdote = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      votes: 0,
      id: String(anecdotes.length+1)
    }

    setAnecdotes(anecdotes.concat(newAnecdote))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(e => e.id === match.params.id)
    : null

  return (
    <div>
      <h1>Software Anecdotes</h1>

      <div>
        <Link style={padding} to="/">Anecdotes</Link>
        <Link style={padding} to="/create">Create New</Link>
        <Link style={padding} to="/about">About</Link>
      </div>

      <Notification notification={notification} />

      <Routes>
        <Route path="/" element={<Anecdotes anecdotes={anecdotes}/>}/>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote}/>} />
        <Route path="/create" element={<AnecdoteForm addAnecdote={addAnecdote} setNotification={setNotification}/>} />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer>
        <br />
        Anecdote App, from exercises of fullstackopen course, a really nice course which is being offered for free!
      </footer>
    </div>
  )
}

export default App