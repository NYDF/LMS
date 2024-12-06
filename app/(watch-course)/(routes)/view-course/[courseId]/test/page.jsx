"use client"
import React, { useEffect, useState, useContext } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import ChapterNav from '../_components/ChapterNav'
import { getCourseById } from '@/app/_services'
import { CompletedChapterContext } from '@/app/_context/CompletedChapterContext'
import { TestContent } from '../_components/TestContent'


function TestPage({ params }) {

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
                priority={true}
              />
            </Link>
          </div>

          <ChapterNav
            params={params}
            course={course}
            userCourse={userCourse}
          />

        </div>

        <div className="flex-grow border shadow-sm p-4 h-[calc(100vh-80px)] overflow-y-auto">
          <div className='float-right p-5 m-6'>
            <UserButton />
          </div>

          <TestContent
            course={course}
            userCourse={userCourse}
            params={params} />
        </div>

      </CompletedChapterContext.Provider>
    </div >
  )




}

export default TestPage
