import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdotes(state, action) {
      const newAnecdote = {
        content: action.payload.content,
        id: action.payload.id,
        votes: action.payload.votes || 0,
      }
      state.push(newAnecdote)
      console.log(JSON.parse(JSON.stringify(state)))
    },
    initialAnecdotes(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      return action.payload
    },
    voteAnecdotes(state, action) {
      const update = action.payload
      const updatedState = state.map(item => item.id !== update.id ? item : update)
      console.log(JSON.parse(JSON.stringify(state)))
      return updatedState
    }
  }
})

export const initial = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(initialAnecdotes(anecdotes))
  }
}

export const create = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdotes(newAnecdote))
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    // retrieve all anecdotes
    const anecdotes = await anecdoteService.getAll()
    // find anecdote to update
    const find = anecdotes.find(item => item.id === id)
    const foundItem = {...find, votes: find.votes + 1}
    const updatedAnecdote = await anecdoteService.update(id, foundItem);
    dispatch(voteAnecdotes(updatedAnecdote))
  }
}

export const { createAnecdotes, voteAnecdotes, initialAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer