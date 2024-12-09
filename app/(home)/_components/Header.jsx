"use client"
import React, { useEffect } from 'react'
import SearchBarOrTitle from './../_components/SearchBar'
import { UserButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import { AlignLeft } from 'lucide-react';

function Header({ toggleSideBar }) {

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => { }, [user])


  return (
    <div className='md:ml-64 p-6 border-b
                    flex items-center justify-between'>

      <AlignLeft className='md:hidden' onClick={() => toggleSideBar(true)} />

      <SearchBarOrTitle />

      {!user ?
        <button onClick={() => router.push('/sign-in')}>Login</button>
        :
        <div className="scale-125">
          <UserButton />
        </div>}
    </div>
  )
}

export default Header
