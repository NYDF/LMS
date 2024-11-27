import { Book } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function CategoryItem({ course }) {
  return (
    <div>
      <div className='border rounded-lg p-3 cursor-pointer hover:border-green-600'>

        <Image src={course.banner?.url}
          alt={course.name}
          width={1000}
          height={500}
          className='rounded-lg'
          priority={true}
        />

        <div className='mt-2'>

          <h2 className='text-[30px] md:text-[25px] font-bold'>
            {course?.name}
          </h2>

          <h2 className='text-gray-500 text-[18px] border-b-2 pb-2 line-clamp-2'>
            {course.author}
          </h2>

          <h2 className='text-gray-700 text-[20px] pt-2'>
            {course.description}
          </h2>

          {course.totalChapters ? <div className='flex items-center gap-2 mt-2'>
            <Book className='h-8 w-8 text-green-600 rounded-full bg-purple-100 p-1' />

            <h2 className="text-[16px] text-gray-500">
              本课程共有
              <span className="font-bold text-green-900 px-2">
                {course.totalChapters}
              </span>
              章节
            </h2>

          </div> : null}

          <h2 className="mt-2 text-[18px] text-orange-900">
            {course?.free ? '本课程完全免费'  : `$ ${course.price}`}
          </h2>

        </div>
      </div>
    </div>
  )
}

export default CategoryItem
