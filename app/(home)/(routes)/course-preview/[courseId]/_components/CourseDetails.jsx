import { Book } from 'lucide-react'
import React from 'react'

function CourseDetails({ courseDetail }) {
  return (
    <div className='mt-5 p-5 rounded-lg border'>
      <h2 className='text-[20px] font-medium'>
        {courseDetail.name}
      </h2>

      <h2 className='text-gray-400 text-[13px]'>
        {courseDetail.author}
      </h2>

      <div className='flex items-center gap-2 mt-2'>
        <Book className='h-6 w-6 text-purple-600
                rounded-full bg-purple-100 p-1' />
        <h2 className='text-[12px] text-gray-400'>
          {courseDetail?.totalChapters} Chapters
        </h2>
      </div>

      <p className='mt-3 text-gray-500'>
        {courseDetail.description}
      </p>

      <h2 className='text-[12px] text-gray-400'>
        {courseDetail.catalog.map((catalog, index) => (

          <div key={index}>
            {catalog}
          </div>

        ))}
      </h2>

      <h2 className='mt-2 text-[14px]'>
        {courseDetail.free ? 'Free' : 'Paid'}
      </h2>

    </div>
  )
}

export default CourseDetails



