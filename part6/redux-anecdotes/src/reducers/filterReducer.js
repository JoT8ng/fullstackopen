import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const filterSlice = createSlice ({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            return action.payload
        },
    }
})

  export const filterChange = (filter) => {
    return {
      type: 'SET_FILTER',
      filter,
    }
  }

  export const { setFilter } = filterSlice.actions
  export default filterSlice.reducer