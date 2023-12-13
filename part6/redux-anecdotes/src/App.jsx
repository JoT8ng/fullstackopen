import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { initial } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/FilterAnecdotes'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect (() => {
    dispatch(initial())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App