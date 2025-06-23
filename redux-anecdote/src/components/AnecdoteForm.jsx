import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdotesReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = ( event ) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={ handleSubmit } >
      <input name='anecdote' placeholder='enter anecdote' />
      <button type='submit'>add</button>
    </form>
  )
}

export default AnecdoteForm