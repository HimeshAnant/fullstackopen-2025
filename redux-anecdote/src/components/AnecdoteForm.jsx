import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdotesReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = ( event ) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value

    dispatch(createAnecdote(anecdote))
    event.target.anecdote.value = ''

    dispatch(setNotification(`new anecdote '${anecdote}' succesfully added!`))
    setTimeout(() => dispatch(setNotification(null)), 5000)
  }

  return (
    <form onSubmit={ handleSubmit } >
      <input name='anecdote' placeholder='enter anecdote' />
      <button type='submit'>add</button>
    </form>
  )
}

export default AnecdoteForm