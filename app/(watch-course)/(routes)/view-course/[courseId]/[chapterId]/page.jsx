"use client"
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import ChapterNav from '../_components/ChapterNav';
import { ChapterContent } from '../_components/ChapterContent';
import { getCourseById } from '../../../../../_services';
import PartNav from '../_components/PartNav';
import { CompletedChapterContext } from '../../../../../_context/CompletedChapterContext'

function ViewChapter({ params }) {

  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [userCourse, setUserCourse] = useState();
  const [activePart, setActivePart] = useState();
  const [completedChapter, setCompletedChapter] = useState();

  // console.log('viewchapter', params)

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
    <div className='flex h-screen'>

      <CompletedChapterContext.Provider value={{ completedChapter, setCompletedChapter }}>

        <div className="w-60 flex-shrink-0 border shadow-sm h-full overflow-y-auto hidden md:block">

          <div className='p-5 border-b z-50'>
            <Link href='/'>
              <Image src='/logo.png'
                alt='logo'
                className='rounded-full'
                width={100}
                height={80}
              />
            </Link>
          </div>

          <ChapterNav
            params={params}
            course={course}
            userCourse={userCourse} />

        </div>

        <div className="w-60 flex-shrink-0 border shadow-sm h-full overflow-y-auto hidden sm:block">
          <PartNav
            course={course}
            userCourse={userCourse}
            params={params}
            setActivePart={(part) => setActivePart(part)} />
        </div>

        <div className="flex-grow border shadow-sm p-4 h-full overflow-y-auto">
          <ChapterContent
            course={course}
            userCourse={userCourse}
            params={params}
            activePart={activePart} />
        </div>

      </CompletedChapterContext.Provider>

    </div>
  )




}

export default ViewChapter
