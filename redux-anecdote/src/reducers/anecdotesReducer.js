const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const initialState = [
  {
    id: '1',
    content: 'Debugging is like being the detective in a crime movie where you are also the murderer.',
    votes: 0
  },
  {
    id: '2',
    content: 'In theory, theory and practice are the same. In practice, they are not.',
    votes: 0
  },
  {
    id: '3',
    content: 'The best thing about a boolean is even if you are wrong, you are only off by a bit.',
    votes: 0
  },
  {
    id: '4',
    content: 'Programmer: A machine that turns coffee into code.',
    votes: 0
  },
  {
    id: '5',
    content: 'Weeks of programming can save you hours of planning.',
    votes: 0
  }
]


const anecdotesReducer = (state = initialState, action) => {
  switch (action.type)
  {
    case 'ADD_ANECDOTE':
      return state.concat(action.payload)

    case 'VOTE_ANECDOTE':
      return state.map( anecdote => anecdote.id === action.payload.id
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote
      )

    default:
      return state
  }
}

export const createAnecdote = (content) => {
  const action = {
    type: 'ADD_ANECDOTE',
    payload: {
      id: String(generateId()),
      content: content,
      votes: 0,
    }
  }

  return action
}

export const voteAnecdote = (id) => {
  const action = {
    type: 'VOTE_ANECDOTE',
    payload: { id }
  }

  return action
}

export default anecdotesReducer