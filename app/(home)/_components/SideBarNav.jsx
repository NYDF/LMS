"use client"
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

function SideBarNav({ toggleSideBar }) {
    const pathName = usePathname();

    const menuList = [
        {
            id: 1,
            name: '课程浏览',
            icon: Search,
            path: '/browse'
        },
        // {
        //     id: 2,
        //     name: 'Dashboard',
        //     icon: Layout,
        //     path: '/dashboard'
        // },
    ]
    const [activeIndex, setActiveIndex] = useState(0);


    return (
        <div className='h-full bg-white border-r flex flex-col overflow-y-auto shadow-md'>

            <div className='border-b z-50 p-5'>
                <Link href='/'>
                    <Image src='/logo.png'
                        alt='logo'
                        width={120}
                        height={90}
                        priority={true}
                        className='rounded-full'
                    />
                </Link>
            </div>

            <div className='flex flex-col '>
                {menuList.map((item, index) => (
                    <Link href={item.path} key={index}
                        className='flex gap-2 items-center p-4 px-6 text-gray-700 hover:bg-customHover hover:bg-opacity-30 cursor-pointer'
                        onClick={() => { setActiveIndex(index); toggleSideBar(false) }}>

                        <item.icon />

                        <h2 className="text-xl">
                            {item.name}
                        </h2>

                    </Link>
                ))}
            </div>

        </div>
    )
}

export default SideBarNav
