import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { initial } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const dispatch = useDispatch()

  useEffect (() => {
    dispatch(initial())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App