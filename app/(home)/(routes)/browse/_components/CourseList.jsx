import Link from 'next/link'
import React from 'react'
import CategoryItem from './../../../_components/CategoryItem'


function CourseList({ courses }) {

  return (
    <div className='mt-5 grid grid-cols-1 gap-5
                    sm:grid-cols-1
                    md:grid-cols-1
                    lg:grid-cols-1' >

      {courses.map((course, index) => (

        <Link href={'/course-preview/' + course.id} key={index}>
          <CategoryItem course={course} />
        </Link>

      ))}

    </div>
  )
}

export default CourseList
