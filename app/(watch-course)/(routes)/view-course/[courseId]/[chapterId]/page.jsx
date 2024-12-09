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
  const [isNavOpen, setIsNavOpen] = useState(true);

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

        <div className="hidden lg:block xl:block w-60 flex-shrink-0 border shadow-sm h-full overflow-y-auto">


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
            userCourse={userCourse} />

        </div>

        <div className="hidden lg:block xl:block w-60 flex-shrink-0 border shadow-sm h-full overflow-y-auto">

          <PartNav
            course={course}
            userCourse={userCourse}
            params={params}
            setActivePart={(part) => setActivePart(part)} />
        </div>

        <div className="flex-grow border shadow-sm p-4 h-[calc(100vh-80px)] overflow-y-auto">
          <div className='float-right p-5 m-6'>
            <UserButton />
          </div>

          <div className="lg:hidden xl:hidden">
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

            <div className="pl-5 pt-5">
              <button
                onClick={() => setIsNavOpen((prev) => !prev)}
                className="bg-customGreen text-white p-2 rounded-md shadow-md">
                {isNavOpen ? '关闭章节导航' : '打开章节导航'}
              </button>
            </div>

            {isNavOpen && (
              <div className="sm:flex md:flex lg:hidden xl:hidden">

                <ChapterNav
                  params={params}
                  course={course}
                  userCourse={userCourse} />

                <div className="w-px bg-gray-300 mx-4"></div>
                <PartNav
                  course={course}
                  userCourse={userCourse}
                  params={params}
                  setActivePart={(part) => setActivePart(part)} />
                <div className="w-px bg-gray-300 mx-4"></div>
              </div>
            )}
          </div>

          <ChapterContent
            course={course}
            userCourse={userCourse}
            params={params}
            activePart={activePart} />

        </div>

      </CompletedChapterContext.Provider >

    </div >
  )




}

export default ViewChapter
