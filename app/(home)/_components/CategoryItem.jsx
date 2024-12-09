import { Book } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function CategoryItem({ course }) {

  if (!course || !course.banner) {
    return null;
  }

  return (
    <div className="container w-full">
      <div className="md:flex md:flex-col lg:grid lg:grid-cols-2 lg:gap-8 border rounded-lg p-3 cursor-pointer hover:border-customHover">

        {/* Left (Image) */}
        <div>
          <Image
            src={course.banner?.url}
            alt={course.name}
            width={1200}
            height={600}
            className="rounded-lg "
            priority={true}
          />
        </div>

        {/* Right (Content) */}
        <div className="mt-4 lg:mt-0">
          <h2 className="text-[30px] md:text-[25px] font-bold">
            {course?.name}
          </h2>

          <h2 className="text-gray-500 text-[18px] border-b-2 pb-2 line-clamp-2">
            {course.author}
          </h2>

          <h2 className="text-gray-700 text-[20px] py-6">
            {course.description}
          </h2>

          {course.totalChapters && (
            <div className="flex items-center gap-2 mt-2">
              <Book className="h-8 w-8 text-customBorder rounded-full bg-customHover p-1" />

              <h2 className="text-[16px] text-gray-500">
                本课程共有
                <span className="font-bold text-green-900 px-2">
                  {course.totalChapters}
                </span>
                章节
              </h2>
            </div>
          )}

          <h2 className="mt-2 text-[18px] text-orange-900">
            {course?.free ? '本课程完全免费' : `$ ${course.price}`}
          </h2>

        </div>
      </div>
    </div>

  )
}

export default CategoryItem
