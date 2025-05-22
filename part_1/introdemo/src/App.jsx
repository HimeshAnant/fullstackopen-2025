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
  console.log(props.parts)
  return (
    <div>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercise} />
      <Part name={props.parts[1].name} exercise={props.parts[1].exercise} />
      <Part name={props.parts[2].name} exercise={props.parts[2].exercise} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}</p>
  )
}

const App = () => {

  const course = {
    name: 'Half stack application development',
    
    parts: [
      {
        name:"Fundamentals of React",
        exercise: 10
      },
      {
        name:"Using props to pass data",
        exercise: 7
      },
      {
        name:"State of a componenet",
        exercise: 14
      }
    ]
  }

  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default App