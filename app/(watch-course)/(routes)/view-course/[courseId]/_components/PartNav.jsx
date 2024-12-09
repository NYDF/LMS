
import React, { useContext, useEffect, useState } from 'react'
import { Check } from 'lucide-react';
import { CompletedChapterContext } from '../../../../../_context/CompletedChapterContext'


function PartNav({ course, userCourse, setActivePart, params }) {

  const { completedChapter, setCompletedChapter } = useContext(CompletedChapterContext)
  const chapterId = params.chapterId

  // console.log('PartNav===========', completedChapter)


  const isPartCompleted = (chapterId, partId) => {
    return completedChapter.some(item => item.chapterId === chapterId && item.partId === partId);
  };

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (course && Array.isArray(course.chapter) && course.chapter.length > 0) {
      setActivePart(course.chapter?.find(chapter => chapter.id === chapterId)[0]);
    }
  }, []);



  return (
    <div>

      <div className='border-b p-5'>
        <h2 className='font-medium text-[20px]'>
          {course.chapter?.find(chapter => chapter?.id === chapterId).name}
        </h2>
      </div>

      <div className='overflow-auto'>
        {course?.chapter?.find(chapter => chapter.id === chapterId)?.allParts?.map((part, index) => (
          <div key={index}
            onClick={() => { setActiveIndex(index); setActivePart(part) }}
            className={`flex gap-2 text-gray-500 md:text-[14px] text-[12px]
                        px-5 p-4 cursor-pointer hover:bg-customHover hover:bg-opacity-30
            ${activeIndex == index ? 'bg-green-100 font-semibold' : null}`} >
            {isPartCompleted(chapterId, part.id) ? <Check /> : (<div style={{ width: '24px' }}></div>)}
            <h2 className='line-clamp-2'>{part.name}</h2>
          </div>
        ))}
      </div>

    </div>
  );

}

export default PartNav
