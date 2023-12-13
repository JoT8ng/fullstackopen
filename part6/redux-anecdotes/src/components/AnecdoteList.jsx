/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
      dispatch(vote(id))
      dispatch(setNotification('added vote to anecdote', 5000))
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