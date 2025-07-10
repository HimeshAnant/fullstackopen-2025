import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

export const addNotification = (notification, timeInSeconds) => {
  return dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => dispatch(setNotification(null)), timeInSeconds*1000)
  }
}

export default notificationSlice.reducer