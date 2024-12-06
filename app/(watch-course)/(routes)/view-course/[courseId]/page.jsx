"use client"
import React, { useEffect, useState } from 'react'
import ChapterNav from './_components/ChapterNav'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { getCourseById } from '../../../../_services';
import { CompletedChapterContext } from '../../../../../app/_context/CompletedChapterContext'

function ViewCourse({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [userCourse, setUserCourse] = useState();
  const [completedChapter, setCompletedChapter] = useState();

  useEffect(() => {
    user ? getCourse() : null;
  }, [user])

  const getCourse = async () => {
    await getCourseById(params?.courseId,
      user.primaryEmailAddress.emailAddress).then(resp => {

        setCourse(resp.courseList);
        setUserCourse(resp?.userEnrollCourses[0]);
        setCompletedChapter(resp?.userEnrollCourses[0]?.completedChapter)
      })
  }


  return (
    <div className=''>

      <CompletedChapterContext.Provider value={{ completedChapter, setCompletedChapter }}>
        <div className='hidden fixed md:block md:w-80 border  shadow-sm h-screen z-50'>

          <div className='p-5 border-b z-50'>
            <Link href='/'>
              <Image src='/logo.png'
                alt='logo'
                className='rounded-full'
                width={90}
                height={90}
                priority={true}
              />
            </Link>
          </div>

          {course ? <ChapterNav
            params={params}
            course={course}
            userCourse={userCourse} />
            : null}

        </div>

        <div className='md:ml-80'>

          <div className="mx-5 p-5 border rounded-lg flex justify-center items-center text-center">
            <span className="text-2xl font-bold">
              请选择想要学习的章节
            </span>
          </div>

          <div className='float-right p-5 '>
            <UserButton />
          </div>

        </div>
      </CompletedChapterContext.Provider>
    </div>
  )



}

export default ViewCourse
