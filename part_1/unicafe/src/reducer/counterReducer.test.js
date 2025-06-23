import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return proper initial state when called with undefined', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = {
      good: 1,
      ok: 1,
      bad: 1,
    }
    const action = {
      type: 'GOOD'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({ ...state, good: state.good + 1 })
  })
})