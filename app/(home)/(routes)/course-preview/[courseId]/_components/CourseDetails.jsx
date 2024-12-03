import { Book } from 'lucide-react'
import React from 'react'

function CourseDetails({ courseDetail }) {

  // console.log(courseDetail)

  return (
    <div className='mt-5 p-5 rounded-lg border'>

      <h2 className='text-[30px] md:text-[25px] font-bold'>
        {courseDetail?.name}
      </h2>

      <h2 className='text-gray-500 text-[18px] border-b-2 pb-2 line-clamp-2'>
        {courseDetail.author}
      </h2>

      <h2 className='text-gray-700 text-[20px] pt-2'>
        {courseDetail.description}
      </h2>

      <div className='flex items-center gap-2 mt-2'>
        <Book className='h-7 w-7 text-green-600 rounded-full bg-purple-100 p-1' />
        <h2 className="text-[18px] text-gray-500">
          本课程共有
          <span className="font-bold text-green-900 px-2">
            {courseDetail.totalChapters}
          </span>
          章节
        </h2>
      </div>

<div className="mt-2 mx-9 ">
      <h2 className="text-[16px] text-gray-600 ">
        <div className="grid grid-cols-2 gap-2 ">
          {courseDetail.catalog.map((catalog, index) => (
            <div className="border-l-2" key={index}>{catalog}</div>
          ))}
        </div>
      </h2>
      </div>

    </div>
  )
}

export default CourseDetails
