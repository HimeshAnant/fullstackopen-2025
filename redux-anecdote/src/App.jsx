import { useSelector } from 'react-redux'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = [...useSelector(state => state.anecdotes)].sort((anecdoteA, anecdoteB) =>
    anecdoteB.votes - anecdoteA.votes
  )

  const prefix = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(anecdote => {
    return anecdote.content.toLowerCase().includes(prefix.toLowerCase())
  })


  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList anecdotes={filteredAnecdotes} />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App