/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    let anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    if (filter) {
        anecdotes = anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
    }

    const handleVote = (id) => {
      dispatch(voteAnecdotes(id))
    }

    return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList