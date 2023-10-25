import React from 'react'
import Header from './header'
import Content from './content'
import Total from './total'


const Course = ({ course }) => {

  return (
    <div>
      {course.map((course) =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}

export default Course;