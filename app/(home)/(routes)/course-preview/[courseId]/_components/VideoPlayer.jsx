import React from 'react'

function VideoPlayer({ videoUrl }) {
  return (
    <div className='border rounded-lg p-3'>

      <h2 className='text-gray-800 mb-3'>
        课程预览
      </h2>

      <video width="1000" height="250"
        controls controlsList='nodownload'>
        <source src={videoUrl}
          type='video/mp4'
        />
      </video>

    </div>
  )
}

export default VideoPlayer
