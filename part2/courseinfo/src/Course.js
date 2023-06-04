const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return (
    parts.map(part =>
      <Part key={part.id} part={part} />
    )
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <strong>
        Number of exercises {totalExercises}
      </strong>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course