const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INITIAL_ANECDOTE':
      return state
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE': {
      const id = action.data.id
      const selectedAnecdote = state.find(e => e.id === id)
      const updatedAnecdote = {...selectedAnecdote, votes: selectedAnecdote.votes + 1}
      return state.map(anecdote => anecdote.id !== id? anecdote: updatedAnecdote)
    }
    default:
      return state
  }
}

const initial = (data) => ({
  type: 'INITIAL_ANECDOTE',
  data,
})

const create = (content) => {
  const newAnecdote = {
    content,
    id: getId(),
    votes: 0
  }

  return {
    type: 'NEW_ANECDOTE',
    data: newAnecdote,
  }
}

const vote = (data) => ({
  type: 'VOTE',
  data,
})

export { create, vote, initial }
export default anecdoteReducer