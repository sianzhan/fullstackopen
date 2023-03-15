const Header = (props) => <h1>{props.course}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => <p>Number of exercises {props.exercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[{ name: part1, exercises: exercises1 }, { name: part2, exercises: exercises2 }, { name: part3, exercises: exercises3 }]} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App