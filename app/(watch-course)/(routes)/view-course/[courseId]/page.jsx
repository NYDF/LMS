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
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

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
    <div className='relative'>
      <CompletedChapterContext.Provider value={{ completedChapter, setCompletedChapter }}>
        {/* Navigation for large screens */}
        <div className='hidden fixed md:block md:w-80 border shadow-sm h-[calc(100vh-80px)] z-50'>
          <div className='p-5 border-b z-50'>
            <Link href='/'>
              <Image
                src='/logo.png'
                alt='logo'
                className='rounded-full'
                width={90}
                height={90}
                priority={true}
              />
            </Link>
          </div>

          {course ? (
            <ChapterNav params={params} course={course} userCourse={userCourse} />
          ) : null}
        </div>

        <div className='block md:hidden p-5'>
          <div className='flex items-center justify-between'>
            <span>
              <Link href='/'>
                <Image
                  src='/logo.png'
                  alt='logo'
                  className='rounded-full'
                  width={90}
                  height={90}
                  priority={true}
                />
              </Link>
            </span>

            <button
              onClick={toggleNav}
              className='bg-customGreen text-white p-2 rounded-md shadow-md'>
              {isNavOpen ? '关闭章节导航' : '打开章节导航'}
            </button>
          </div>
        </div>

        {isNavOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-white z-50 md:hidden'>
            <div className='p-5 border-b'>
              <Link href='/'>
                <Image
                  src='/logo.png'
                  alt='logo'
                  className='rounded-full'
                  width={90}
                  height={90}
                  priority={true}
                />
              </Link>
            </div>

            {course ? (
              <ChapterNav params={params} course={course} userCourse={userCourse} />
            ) : null}
            <div className='p-5'>
              <button
                onClick={toggleNav}
                className='bg-customBorder text-white p-2 rounded-md shadow-md'>
                关闭章节导航
              </button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className={`md:ml-80 ${isNavOpen ? 'hidden md:block' : ''}`}>
          <div className='float-right p-5'>
            <UserButton />
          </div>
          <div className='mx-5 p-5 border rounded-lg flex justify-center items-center text-center'>
            <span className='text-2xl font-bold'>请选择想要学习的章节</span>
          </div>

        </div>
      </CompletedChapterContext.Provider>
    </div>
  )



}

export default ViewCourse
