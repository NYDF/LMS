import Footer from '@/app/(home)/_components/Footer'
import React from 'react'

function WatchChapterLayout({ children }) {
  return (
    <div>
      {children}
      <Footer className='w-full h-60px fixed bottom-0 left-0' />
    </div>
  )
}

export default WatchChapterLayout
