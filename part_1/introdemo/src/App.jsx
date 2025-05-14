var Hello = (props) => {
  console.log(props)
  return (
    <>
      <p>Hello {props.name}</p>
    </>
  )
}

const App = () => {
  const a = 10
  const b = 20
  const now = new Date()

  const name = "lucifer"
  const age = 699999

  console.log(now, "Hey folks")

  return (
    <>
      <Hello name={name} age={age}/>
      <p>it is {now.toString()}</p>
      <p>
        {a} plus {b} equals {a+b}
      </p>
    </>
  )
}

export default App