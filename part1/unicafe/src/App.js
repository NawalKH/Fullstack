import { useState } from 'react'


const StatisticLine = (props) =>(
 <tr> 
 <td>{props.text}</td>
<td>{props.value}</td>
</tr>
)

const Statistics = ({good,neutral,bad}) => {

  const calculateAll = () => good+neutral+bad

  const calculateAverage = () => {
    const all = calculateAll()
    let average = 0

    if(all !==0)
    average= (good - bad) / all
    
    return average
  }

  const calculatePositive= () => {
    const all = calculateAll()
    let positive = 0

    if(all !== 0)
    positive = good/all *100

    return positive +' %'
  }

  if ( calculateAll() === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

return(
  <table>
     <tbody>
    <StatisticLine text="good" value ={good} />
    <StatisticLine text="neutral" value ={neutral} />
    <StatisticLine text="bad" value ={bad} />
    <StatisticLine text="all" value ={calculateAll()} />
    <StatisticLine text="average" value ={calculateAverage()} />
    <StatisticLine text="positive" value ={calculatePositive()}/>
      </tbody>
     </table>
)
  
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
     <h1>give feedback</h1>
     <Button handleClick={() => setGood(good + 1)} text="good" />  
     <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" /> 
     <Button handleClick={() => setBad(bad + 1)} text="bad" /> 

     <h1>Statistics</h1>

     <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App