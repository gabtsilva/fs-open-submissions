import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = (props) => {
    return props.good + props.bad + props.neutral === 0 ? <div>No feedback given</div> :
        <div>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text="neutral" value={props.neutral}/>
            <StatisticLine text="bad" value={props.bad}/>
            <StatisticLine text="all" value={props.good + props.bad + props.neutral}/>
            <StatisticLine text="average" value={(props.good - props.bad) / (props.good + props.bad + props.neutral)}/>
            <StatisticLine text="positive" value={props.good / (props.good + props.bad + props.neutral)}/>
        </div>
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <h1>Give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text="good"/>
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
            <Button onClick={() => setBad(bad + 1)} text="bad"/>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </>
    )
}

export default App