"use client"
import React, { useEffect, useState } from 'react'
import { GetUserCourseList } from '../../../_services'
import { useUser } from '@clerk/nextjs'
import CategoryItem from '../../_components/CategoryItem';
import Link from 'next/link';

function Dashboard() {
    const { user } = useUser();
    const [userCourseList, setUserCourseList] = useState([]);

    useEffect(() => {
        user ? getUserCourse() : null;
    }, [user])

    const getUserCourse = async () => {
        await GetUserCourseList(user.primaryEmailAddress.emailAddress)
            .then(resp => {
                if (resp)
                    setUserCourseList(resp?.userEnrollCourses)
            })
    }


    return (
        <div>
            {userCourseList.length > 0 ?
                <div>
                    <h2 className='text-[20px] font-medium'>我已购买的课程:</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-1
                                    md:grid-cols-1 lg:grid-cols-2 mt-5 gap-5'>
                        {userCourseList && userCourseList.map((course, index) => (
                            <Link href={'/course-preview/' + course.courseList?.id} key={index} >
                                <CategoryItem course={course?.courseList} />
                            </Link>
                        ))}
                    </div>
                </div>
                :
                <div className='flex justify-center items-center
                                text-[20px] mt-20 text-gray-500'>
                    <h2>您尚未购买任何课程。</h2>
                </div>}
        </div>
    )

}

export default Dashboard
