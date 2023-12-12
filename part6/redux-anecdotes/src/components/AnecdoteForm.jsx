import { useDispatch } from 'react-redux'
import { createAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const getId = () => (100000 * Math.random()).toFixed(0)
    
    const handleCreate = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdotes({ content, id: getId(), votes: 0 }))
        dispatch(setNotification('added new annecdote', 5000))
    }

    return (
        <div>
            <form onSubmit={handleCreate}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm