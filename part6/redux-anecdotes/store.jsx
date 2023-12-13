import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './src/reducers/notificationReducer'
import anecdoteReducer from './src/reducers/anecdoteReducer'
import filterReducer from './src/reducers/filterReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notifications: notificationReducer
    }
})

export default store