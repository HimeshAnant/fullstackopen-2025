import { useState } from 'react'


const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Display = ({anecdotes, votes, id}) => {
  if (id === -1) {
    return (
      <h3>Press button to get Anecdotes</h3>
    )
  }

  return (
    <>
    <h1>{anecdotes[id]}</h1>
    <p>votes: {votes[id]}</p>
    </>
  )
}

const DisplayVoteButton = ({updateVotes, id}) => {
  if (id === -1) return <></>

  return (
    <Button handleClick={updateVotes} text={"Vote"} />
  )
}

const DisplayHighestVoted = ({votes, anecdotes}) => {
  const argmax = votes.reduce( (bestIdx, curVal, curIdx, array) => 
    (curVal > array[bestIdx] ? curIdx : bestIdx )
  )


  if (votes[argmax] === 0) {
    return (
      <div>
        <p>You need to vote something first</p>
      </div>
    )
  }

  return (
    <div>
      <p>{anecdotes[argmax]}</p>
      <p>Votes: {votes[argmax]}</p>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [id, setId] = useState(-1)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

  const getRandomId = () => Math.floor(Math.random() * anecdotes.length)

  const updateAnecdote = () => {
    let newId = getRandomId()
    if (newId === id) newId = (id + 1) % anecdotes.length

    setId(newId)
  }

  const updateVotes = () => {
    const newVotes = votes.map( (val, i) => i === id ? val+1 : val )
    setVote(newVotes)
  }

  return (
    <div>
      <Display anecdotes={anecdotes} votes={votes} id={id} />
      <Button handleClick={updateAnecdote} text={"next anecdote"}/>
      <DisplayVoteButton updateVotes={updateVotes} id={id} />

      <h1>Anecdote with most votes</h1>
      <DisplayHighestVoted votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App