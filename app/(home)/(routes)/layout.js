"use client"
import React, { useState } from 'react'
import SideBarNav from './../_components/SideBarNav'
import Header from './../_components/Header'
import Footer from '../_components/Footer';

function homeLayout({ children }) {
  const [toggleSideBar, setToggleSideBar] = useState(false);

  return (
    <div>
      <div>

        {toggleSideBar ? <div className='h-[calc(100vh-80px)] w-64 md:flex flex-col fixed inset-y-0 z-50 '>
          <SideBarNav toggleSideBar={() => setToggleSideBar(false)} />
        </div> : null}

        <div className='h-[calc(100vh-80px)] w-64 md:flex flex-col md:fixed inset-y-0 z-50 hidden'>
          <SideBarNav />
        </div>

        <Header toggleSideBar={() => setToggleSideBar(true)} />

        <div className='md:ml-64 p-5'>
          {children}
        </div>

        <Footer className='w-full h-60px fixed bottom-0 left-0' />

      </div>
    </div>
  )
}

export default homeLayout
