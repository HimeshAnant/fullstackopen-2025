const Part = ({ part }) => {
    return (
        <li>{part.name} : {part.exercises}</li>
    )
}

const Course = ({ course }) => {
    const totalExercises = () => course.parts.reduce( (sum, val) => sum + val.exercises, 0 )

    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part => (
                    <Part key={part.id} part={part} />
                ))}
            </ul>
            <h3>total of {totalExercises()} exercises</h3>
        </div>
    )
}

export default Course