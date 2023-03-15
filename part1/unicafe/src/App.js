import { useState } from 'react'

const Header = props => <h1>{props.text}</h1>

const Button = props => <button onClick={props.handleClick}>{props.text}</button>

const Display = props => <div>{props.name} {props.value}</div>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  if (all === 0) {
    return <div>No feedback given</div>
  }
  
  return (
    <>
      <Display name='good' value={good} />
      <Display name='neutral' value={neutral} />
      <Display name='bad' value={bad} />
      <Display name='all' value={all} />
      <Display name='average' value={average} />
      <Display name='positive' value={positive + ' %'} />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />

      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App