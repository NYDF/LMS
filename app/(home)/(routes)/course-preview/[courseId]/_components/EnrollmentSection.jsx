import React, { useContext } from 'react'
import { EnrollCourse, PublishCourse } from '../../../../../_services'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

// import { UserMembershipContext } from '../../../../../_context/UserMembershipContext';

function EnrollmentSection({ courseDetail, userCourse }) {
    const { user } = useUser();
    const router = useRouter();
    // const { userMembership, setUserMembership } = useContext(UserMembershipContext);
    // console.log("courseDetail?.totalChapters", courseDetail?.totalChapters)
    // const enrollCourse = async () => {
    //     if (user) {
    //         await EnrollCourse(courseDetail.id, user.primaryEmailAddress.emailAddress)
    //             .then(async (resp) => {
    //                 console.log("EnrollCourseResp=>", resp);
    //                 if (resp) {
    //                     await PublishCourse(resp?.createUserEnrollCourse?.id).then(result => {
    //                         console.log(result);
    //                         if (result) {
    //                             courseDetail.totalChapters ? router.push('/view-course/' + courseDetail.id)
    //                             : window.location.reload();
    //                         }
    //                     })
    //                 }
    //             })
    //     }
    //     else {
    //         router.push('/sign-in');
    //     }
    // }

    const enrollCourse = async () => {
        if (user) {
            // console.log('111111111111111111', courseDetail.id, user.primaryEmailAddress.emailAddress);
            await EnrollCourse(courseDetail.id, user.primaryEmailAddress.emailAddress)
                .then(async (resp) => {
                    // console.log("2222222222222222222222=>", resp);
                    if (resp) {
                        await PublishCourse(resp?.createUserEnrollCourse?.id).then(result => {
                            console.log('66666666666666666666', result);
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
                    <h2 className='text-gray-500 '>您已购买本课程，请继续努力学习~</h2>
                    <button
                        className='p-2 w-full bg-purple-500 text-white rounded-lg text-[14px] mt-2 hover:bg-purple-700'
                        onClick={() => courseDetail?.totalChapters
                            ? router.push('/view-course/' + courseDetail.id) : window.location.reload()}>
                        继续学习
                    </button>
                </div>
                :
                <div className='mt-5 border rounded-lg p-4 text-center'>
                    <h2 className='text-gray-500'>这么好的课程肯定心动了吧？</h2>
                    <button
                        className='p-2 w-full bg-purple-500 text-white rounded-lg text-[14px] mt-2 hover:bg-purple-700'
                        onClick={() => enrollCourse()}>
                        购买课程
                    </button>
                </div>
            }

            {/* {courseDetail.free || !userCourse?.courseId ?
                <div className='mt-5 border rounded-lg p-4 text-center'>
                    <h2 className='text-gray-500'>这么好的课程肯定心动了吧？</h2>
                    <button
                        className='p-2 w-full bg-purple-500 text-white rounded-lg text-[14px] mt-2 hover:bg-purple-700'
                        onClick={() => enrollCourse()}>
                        购买课程
                    </button>
                </div>
                : null} */}

        </div>
    )
}

export default EnrollmentSection
