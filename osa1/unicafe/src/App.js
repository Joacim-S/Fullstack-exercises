import { useState } from 'react'

const Header = ({header}) => <div><h1>{header}</h1></div>

const Button = ({text, handler, value}) => (
  <button onClick={() => handler(value + 1)}> {text} </button>
)

const Statistics = ({stats}) => {
  const total=stats[0]+stats[1]+stats[2]

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const avg=(stats[0]-stats[2])/total
  const pos=stats[0]/total*100+' %'
  return(
      <table>
        <tbody>
          <StatisticLine text="good" value ={stats[0]} />
          <StatisticLine text="neutral" value ={stats[1]} />
          <StatisticLine text="bad" value ={stats[2]} />
          <StatisticLine text="all" value ={total} />
          <StatisticLine text="average" value ={avg} />
          <StatisticLine text="positive" value ={pos} />
        </tbody>
      </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
  <tr><td>{text}</td><td>{value}</td></tr>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header={'Give feedback'} />
      <Button value={good} handler={setGood} text='Good' />
      <Button value={neutral} handler={setNeutral} text='Neutral' />
      <Button value={bad} handler={setBad} text='Bad' />
      <Header header={'Statistics'} />
      <Statistics stats={[good, neutral, bad]} />
    </div>
  )
}

export default App