import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Total = (stats) => {
  return stats.good + stats.bad + stats.neutral
}

const DisplayLine = ({stats, attr}) => (
  <tr>
    <td>{attr}</td>
    <td>{stats[attr]}</td>
  </tr>
)

const Display = ({stats}) => {
  return (
    <>
      <DisplayLine stats={stats} attr={"good"} />
      <DisplayLine stats={stats} attr={"neutral"} />
      <DisplayLine stats={stats} attr={"bad"} />
    </>
  )
}

const DisplayMets = ({stats}) => {
  return (
    <>
    <tr>
      <td>Average:</td>
      <td>{(stats.good + -1*stats.bad + 0*stats.neutral) / (Total(stats))}</td>
    </tr>
    <tr>
      <td>positive:</td>
      <td>{(stats.good) / Total(stats) * 100}%</td>
    </tr>
    </>
  )
}

const DisplayStats = ({stats}) => {
  if (Total(stats) === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  
  return (
    <div>
      <table>

        <tbody>
          <Display stats={stats} />
          <DisplayMets stats={stats} />
        </tbody>

      </table>
    </div>
  )
}

const App = () => {
  const [stats, setStats] = useState({
    good:0,
    neutral:0,
    bad:0
  })

  const HandleClick = (attr) => () => {
    return setStats({
      ...stats,
      [attr]:stats[attr]+1
    })
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={HandleClick("good")} text={"Good"}/>
      <Button onClick={HandleClick("neutral")} text={"Neutral"}/>
      <Button onClick={HandleClick("bad")} text={"Bad"}/>

      <h1>Statistics</h1>
      <DisplayStats stats={stats}/>
    </div>
  )
}

export default App