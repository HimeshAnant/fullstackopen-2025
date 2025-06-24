import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'


const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote (state, action) {
      return state.map( anecdote =>
        anecdote.id === action.payload.id
          ? action.payload
          : anecdote
      )
    },

    appendAnecdote (state, action) {
      state.push(action.payload)
    },

    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdotesSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdoteContent) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdoteContent)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdotesSlice.reducer