import React, { useContext } from 'react'
import { EnrollCourse, PublishCourse } from '../../../../../_services'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

// import { UserMembershipContext } from '../../../../../_context/UserMembershipContext';

function EnrollmentSection({ courseDetail, userCourse }) {
    const { user } = useUser();
    const router = useRouter();

    const enrollCourse = async () => {
        if (user) {

            await EnrollCourse(courseDetail.id, user.primaryEmailAddress.emailAddress)
                .then(async (resp) => {

                    if (resp) {
                        await PublishCourse(resp?.createUserEnrollCourse?.id).then(result => {

                            if (result) {
                                courseDetail.totalChapters ? router.push('/view-course/' + courseDetail.id)
                                    : window.location.reload();
                            }
                        })
                    }
                })
        }
        else {
            router.push('/sign-in');
        }
    }


    return (
        <div>

            {userCourse?.courseId ?
                <div className='mt-5 border rounded-lg p-4 text-center'>
                    <h2 className='text-gray-500 '>您已购买本课程，请继续学习~</h2>
                    <button
                        className='p-2 w-full bg-purple-500 text-white rounded-lg text-[14px] mt-2 hover:bg-purple-700'
                        onClick={() => courseDetail?.totalChapters
                            ? router.push('/view-course/' + courseDetail.id) : window.location.reload()}>
                        进入课程
                    </button>
                </div>
                :
                <div className='mt-5 border rounded-lg p-4 text-center'>
                    <h2 className='text-gray-500'>本优质课程仅需：</h2>
                    {courseDetail ? (
                        <button
                            className="p-2 w-full bg-orange-700 text-white rounded-lg text-[16px] mt-2 hover:bg-green-500"
                            onClick={() => enrollCourse()}
                        >
                            <h2 className="text-[18px]">
                                {courseDetail.free ? '本课程完全免费' : `$ ${courseDetail.price || 0}`}
                            </h2>
                        </button>
                    ) : (
                        <div>Loading...</div> // Placeholder while courseDetail is undefined
                    )}
                </div>
            }
        </div>
    )
}

export default EnrollmentSection
