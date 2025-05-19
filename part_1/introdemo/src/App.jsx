const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} : {props.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.part1} exercise={props.excercise1} />
      <Part name={props.part2} exercise={props.excercise2} />
      <Part name={props.part3} exercise={props.excercise3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.excercise1 + props.excercise2 + props.excercise3}</p>
    </>
  )
}

const App = () => {
  const course = 'Half stack application development'
  const part1 = 'Fundamentals of React'
  const excercise1 = 10
  const part2 = 'Using props to pass Data'
  const excercise2 = 7
  const part3 = 'State of a component'
  const excercise3 = 14

  return (
    <>
      <Header name={course}/>
      <Content part1={part1} part2={part2} part3={part3} excercise1={excercise1} excercise2={excercise2} excercise3={excercise3} />
      <Total excercise1={excercise1} excercise2={excercise2} excercise3={excercise3} />
    </>
  )
}

export default App