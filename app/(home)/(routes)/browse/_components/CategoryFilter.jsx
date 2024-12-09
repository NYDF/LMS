"use client"
import React, { useState } from 'react'

function CategoryFilter({ selectedCategory }) {

    const [activeIndex, setActiveIndex] = useState(0)

    const filterOptions = [
        {
            id: 1,
            name: '全部课程',
            value: 'all'
        },
        {
            id: 2,
            name: '行为疗法',
            value: 'tfcbt'
        }
    ]


    return (
        <div className='flex gap-5'>
            {filterOptions.map((item, index) => (
                <button key={index}
                    onClick={() => {
                        setActiveIndex(index);
                        selectedCategory(item.value)
                    }}
                    className={`border p-2 px-4 text-sm rounded-md
                                hover:border-customHover font-semibold hover:bg-customHover hover:bg-opacity-30
                                ${activeIndex == index ? 'border-customHover border-3 text-grey-800' : null}`}>

                    <h2>{item.name}</h2>

                </button>
            ))}
        </div>
    )
}

export default CategoryFilter
