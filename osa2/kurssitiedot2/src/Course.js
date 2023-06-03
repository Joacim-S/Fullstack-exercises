const Course = ({course}) => {
    const Header = ({header}) => {

      return (
        <div>
          <h1>{header}</h1>
        </div>
      )
      }
    const Total = ({parts}) => {
      const points = parts.map(part => part.exercises)

      return (
        <b>Total of {points.reduce(
          (accumulator, current) => accumulator + current, 0
        )} exercises
        </b>
      )
    }
    const Content = ({parts}) => {
      const Part = ({part}) => {
        return (
          <p>
            {part.name} {part.exercises}
          </p>
        )
      }

      return (
        parts.map(part => 
          <Part key={part.id} part={part} />
        )
      )
      
    }

    return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    )
  }

export default Course