"use client"
import React, { useEffect, useState } from 'react'
import { getCourseById } from '../../../../_services'
import VideoPlayer from './_components/VideoPlayer'
import CourseDetails from './_components/CourseDetails'
import OptionSection from './_components/OptionSection'
import EnrollmentSection from './_components/EnrollmentSection'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

function CoursePreview({ params }) {
  const [courseDetail, setCourseDetails] = useState([]);
  const [userCourse, setUserCourse] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    params.courseId ? getCourse(params.courseId) : null;
  }, [user])

  const getCourse = () => {
    getCourseById(params.courseId, user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        // console.log('1111111111111111', resp)
        setCourseDetails(resp.courseList);
        setUserCourse(resp?.userEnrollCourses[0])
      })
  }


  return courseDetail?.name && (
    <div className=''>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='col-span-2'>

          <VideoPlayer videoUrl={courseDetail?.video?.url} />

          <CourseDetails courseDetail={courseDetail} />

        </div>

        <div className=' mt-5 md:mt-0'>

          <OptionSection courseDetail={courseDetail} />

          <EnrollmentSection courseDetail={courseDetail} userCourse={userCourse} />

        </div>

      </div>
    </div>
  )
}

export default CoursePreview
