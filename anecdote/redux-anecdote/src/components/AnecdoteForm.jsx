import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdotesReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value

    dispatch(createAnecdote(anecdote))
    event.target.anecdote.value = ''

    dispatch(addNotification(`new anecdote '${anecdote}' succesfully added!`, 5))
  }

  return (
    <form onSubmit={ handleSubmit } >
      <input name='anecdote' placeholder='enter anecdote' />
      <button type='submit'>add</button>
    </form>
  )
}

export default AnecdoteForm