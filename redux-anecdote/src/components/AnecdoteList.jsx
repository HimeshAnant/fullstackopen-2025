import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdotesReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const handleLike = () => {
    dispatch(voteAnecdote(anecdote.id))
  }

  const style = {
    borderStyle: 'Solid',
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

const AnecdoteList = () => {
  let anecdotes = useSelector( anecdote => anecdote )
  anecdotes = anecdotes.sort( (anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes )

  return (
    <div>
      {anecdotes.map( anecdote =>
        <Anecdote key={ anecdote.id } anecdote={anecdote} />
      )}
    </div>
  )
}

export default AnecdoteList