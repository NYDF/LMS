import { CheckCircle2, PauseCircle, PlayCircle } from 'lucide-react'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { CompletedChapterContext } from '../../../../../_context/CompletedChapterContext';

function ChapterNav({ params, course, userCourse }) {

    const [activeIndex, setActiveIndex] = useState(0);

    const { completedChapter, setCompletedChapter } = useContext(CompletedChapterContext)

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

            <div className='overflow-auto  h-[800px]'>
                {course?.chapter?.map((chapter, index) => (
                    <Link href={'/view-course/' + course.id + '/' + chapter.id} key={index} >
                        <div key={index}
                            className={`flex gap-2 text-gray-700 md:text-[14px] text-[12px] px-5 p-4 cursor-pointer hover:bg-customHover hover:bg-opacity-30
                                       ${selectedChapterId == chapter.id ? 'bg-green-100 font-semibold' : null}`}>

                            {activeIndex == index ? <PauseCircle height={25} width={25} /> :
                                isChapterCompleted(chapter.chapterNumber) ?
                                    <CheckCircle2 height={25} width={25} /> : <PlayCircle height={25} width={25} />}

                            <h2 className='line-clamp-2'>{chapter.name}</h2>
                        </div>
                    </Link>
                ))}

                <Link href={'/view-course/' + course.id + '/test/'}>
                    <div className="text-gray-700 md:text-[14px] text-[16px] px-5 p-4 cursor-pointer hover:bg-customHover hover:bg-opacity-30 line-clamp-2 flex items-center space-x-2">
                        <CheckCircle2 height={25} width={25} />
                        <span>结业考试</span>
                    </div>
                </Link>

            </div>
        </div>
    )

}

export default ChapterNav
