import { CheckCircle2, CircleChevronRight, CircleArrowRight, CircleCheckBig } from 'lucide-react'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { CompletedChapterContext } from '../../../../../_context/CompletedChapterContext';

function ChapterNav({ params, course, userCourse }) {

    const [activeIndex, setActiveIndex] = useState(0);

    const { completedChapter, setCompletedChapter } = useContext(CompletedChapterContext)

    // console.log('ChapterNav~~~~~~~~~~~~~~~~~~~completedChapter', completedChapter)
    // console.log('ChapterNav~~~~~~~~~~~~~~~~~~~course', course)

    const isChapterCompleted = (chapter) => {

        if (!chapter?.allParts || chapter.allParts.length === 0) {
            return false; // Consider incomplete if no parts exist
        }

        // Count completed parts for this chapter
        const completedChapterNum = chapter.allParts.filter(part =>
            completedChapter.some(completed => completed.partId === part.id)
        ).length;

        // Check if all parts are completed
        return completedChapterNum === chapter.allParts.length;
    }

    const selectedChapterId = params.chapterId

    return (
        <div>
            <div className='border-b p-5'>
                <h2 className='font-medium text-[20px]'>{course.name}</h2>
                <h2 className='text-gray-500 text-[14px]'>By {course.author}</h2>
            </div>

            <div className='overflow-auto '>
                {course?.chapter?.map((chapter, index) => (
                    <Link href={'/view-course/' + course.id + '/' + chapter.id} key={index} >
                        <div key={index}
                            className={`flex gap-2 text-gray-700 md:text-[14px] text-[12px] px-5 p-4 cursor-pointer hover:bg-customHover hover:bg-opacity-30
                                       ${selectedChapterId == chapter.id ? 'bg-green-100 font-semibold' : null}`}>

                            {isChapterCompleted(chapter) ?
                                <CircleCheckBig height={25} width={25} /> : (<div style={{ width: '24px' }}></div>)}

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
