import { CheckCircle2, PauseCircle, PlayCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { CompletedChapterContext } from '../../../../../_context/CompletedChapterContext';

function ChapterNav({ params, course, userCourse }) {

    const [activeIndex, setActiveIndex] = useState(0);

    const { completedChapter, setCompletedChapter } = useContext(CompletedChapterContext)

    const router = useRouter();

    // console.log('ChapterNav~~~~~~~~~~~~~~~~~~~', course)

    const isChapterCompleted = (chapterId) => {
        return completedChapter?.find(item => item.chapterId == chapterId)
    }

    const selectedChapterId = params.chapterId

    return (
        <div>
            <div className='border-b p-5'>
                <h2 className='font-medium text-[20px]'>{course.name}</h2>
                <h2 className='text-gray-500 text-[14px]'>By {course.author}</h2>
            </div>

            <div className='overflow-auto  h-[600px]'>
                {course?.chapter?.map((chapter, index) => (

                    <Link href={'/view-course/' + course.id + '/' + chapter.id} key={index} >
                        <div key={index}
                            className={`flex gap-2 text-gray-500 md:text-[14px] text-[12px] px-5 p-4 cursor-pointer hover:bg-gray-100
                                       ${isChapterCompleted(chapter.chapterNumber) && activeIndex != index ? 'bg-purple-100 text-purple-600' : null}
                                       ${selectedChapterId == chapter.id ? 'bg-green-100 text-green-700' : null}`}>

                            {activeIndex == index ? <PauseCircle height={25} width={25} /> :
                                isChapterCompleted(chapter.chapterNumber) ?
                                    <CheckCircle2 height={25} width={25} /> : <PlayCircle height={25} width={25} />}

                            <h2 className='line-clamp-2'>{chapter.name}</h2>
                        </div>
                    </Link>


                ))}
            </div>

        </div>
    )

}

export default ChapterNav
