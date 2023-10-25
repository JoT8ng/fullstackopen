import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <tr><td>{text} {value}%</td></tr>
    )
  }
  return (
    <tr><td>{text} {value}</td></tr>
  )
}

const Button = ({ onClick, text }) => {
  return (
  <button onClick={onClick}>
    {text}
  </button>
  )
}

const Statistics = (props) => {
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral

  const total = good + bad + neutral
  const average = (good * 1 + bad * -1) / total
  const positive = 100 * (good / total)

  if (total === 0) {
    return (
      <div>No feedback given</div>
  )
}

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine value={good} text='good' />
          <StatisticLine value={neutral} text='neutral' />
          <StatisticLine value={bad} text='bad' />
          <StatisticLine value={total} text='all' />
          <StatisticLine value={positive} text='positive' />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App