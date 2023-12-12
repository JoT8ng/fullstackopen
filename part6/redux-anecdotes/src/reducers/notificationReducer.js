import { createSlice } from '@reduxjs/toolkit'

const initialState = ['hi welcome to anecdotes']

const notificationSlice = createSlice ({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            console.log(JSON.parse(JSON.stringify(state)))
            return action.payload
        },
        removeNotification(state) {
            console.log(JSON.parse(JSON.stringify(state)))
            return initialState
        }
    }
})

export const notifyChange = (content, time) => {
    return async dispatch => {
      dispatch(setNotification(content))
      setTimeout(() => {
        dispatch(removeNotification(null))
      }, time)
    }
}
  

  export const { setNotification, removeNotification } = notificationSlice.actions
  export default notificationSlice.reducer