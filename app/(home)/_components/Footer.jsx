import React from 'react'

function Footer() {

  return (

    <footer className="fixed bottom-0 left-0 z-20 w-full p-4
                   bg-white border-t border-gray-200 shadow
                   md:flex md:items-center md:justify-between md:p-6
                   dark:bg-gray-800 dark:border-gray-600">

      <span className="text-base text-gray-500 sm:text-center dark:text-gray-400">
        @ 2024 <a href="#" class="hover:underline">公司名</a>. All Rights Reserved.
      </span>

      <ul className="flex flex-wrap items-center mt-3 text-base font-medium text-gray-500 dark:text-gray-400 sm:mt-0">

        <li>
          <a href="#" className="hover:underline me-4 md:me-6">关于我们</a>
        </li>

        <li>
          <a href="#" class="hover:underline me-4 md:me-6">保密协议</a>
        </li>

        <li>
          <a href="#" class="hover:underline">联系方式</a>
        </li>
      </ul>

    </footer>

  )
}

export default Footer
