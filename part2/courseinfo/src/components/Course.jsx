const Header = (props) => {
    return <h2>{props.course}</h2>
}

const Total = ({ sum }) => {
    return <p><b>Total of {sum} exercises</b></p>
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Course = ({course}) => {
    const sumOfExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={sumOfExercises} />
        </div>
    )

}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </div>
    )
}

export default Course