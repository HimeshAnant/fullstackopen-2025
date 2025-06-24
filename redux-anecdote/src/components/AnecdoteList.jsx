import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdotesReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const handleLike = () => {
    dispatch(voteAnecdote(anecdote.id))

    dispatch(setNotification(`you voted '${anecdote.content}'`))

    setTimeout(() => dispatch(setNotification(null)), 5000)
  }

  const style = {
    borderStyle: 'Solid',
    borderWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  }

  return (
    <div style={style}>
      <p>{anecdote.content}</p>
      <span>has {anecdote.votes}</span>
      <button onClick={handleLike}>vote</button>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      {anecdotes.map( anecdote =>
        <Anecdote key={ anecdote.id } anecdote={anecdote} />
      )}
    </div>
  )
}

export default AnecdoteList