import { INavbar } from '@utils/types'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiX } from 'react-icons/bi'

const MobileNavbar = ({ navItems, navOpen, toggleMobileNav }: INavbar) => {
  return (
    <div
      onClick={toggleMobileNav}
      className={`fixed right-0 top-0 left-0 flex w-full justify-center bg-primary-green2/40 text-gray-200 backdrop-blur-sm ${
        navOpen ? 'z-[9999] h-screen opacity-100' : 'z-[1] h-0 opacity-0'
      } transition-all duration-700`}
    >
      <BiX className="absolute top-3 right-5 cursor-pointer text-4xl transition-all duration-700 hover:rotate-[20deg]" />
      <div className="flex h-full w-full flex-col items-center space-y-8 p-5 pt-10">
        {navItems.map((item, i) => (
          <Link href={item.link} key={i}>
            <a className="group relative">
              <span className="">{item.text}</span>
              <span className="absolute -bottom-1 left-1/2 h-[1px] w-0 -translate-x-1/2 rounded-full bg-gray-100 opacity-0 transition-all duration-500 group-hover:w-full group-hover:bg-primary-green3 group-hover:opacity-100"></span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileNavbar
