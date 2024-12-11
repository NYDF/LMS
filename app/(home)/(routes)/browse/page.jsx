"use client"
import React, { useEffect, useState } from 'react'
import CategoryFilter from './_components/CategoryFilter'
import { getCourseList } from './../../../_services/index'
import CourseList from './_components/CourseList'
import { useUser } from '@clerk/nextjs'
import Participants from './_components/Participants'
import Trend from './_components/Trend'

function Browse() {

  const [courses, setCourses] = useState([]);
  const [coursesOrg, setCoursesOrg] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    getCourses()

  }, [user])

  const getCourses = () => {
    getCourseList().then(resp => {
      setCourses(resp.courseLists);
      setCoursesOrg(resp.courseLists)
    })
  }

  const filterCourse = (category) => {
    if (category == 'all') {
      setCourses(coursesOrg);
      return;
    }

    const filteredList = coursesOrg.filter(course => {
      return course.tag?.includes(category);
    })

    setCourses(filteredList);
  }


  return (
    <div>
      <CategoryFilter selectedCategory={(category) => filterCourse(category)} />
      {courses ? <CourseList courses={courses} /> : null}
      <Participants />
      <Trend />
    </div>
  )
}

export default Browse
