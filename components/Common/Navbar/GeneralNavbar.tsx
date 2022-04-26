import { GENERAL_NAV_ITEMS1, GENERAL_NAV_ITEMS2 } from '@utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GeneralLogo from '../Logo/GeneralLogo'
import { BiMenu, BiX } from 'react-icons/bi'
import { useState } from 'react'
import useSticky from '@hooks/useSticky'
import { INavbar } from '@utils/types'

const GeneralNavbar = ({ navItems, navOpen, toggleMobileNav }: INavbar) => {
  const { sticky } = useSticky()

  return (
    <nav
      className={`z-[99] flex h-12 w-full items-center justify-between px-5 text-gray-100 md:px-8 ${
        sticky
          ? 'fixed top-0 bg-gradient-to-b from-primary-green2/90 to-primary-green/80 backdrop-blur-sm'
          : 'relative bg-linearG'
      } transition-all duration-700`}
    >
      <GeneralLogo sticky={sticky} useSmall={sticky} />
      <div className="hidden flex-1 justify-end space-x-5 sm:flex lg:space-x-8 lg:text-lg">
        {navItems.map((item, i) => (
          <Link href={item.link} key={i}>
            <a className="group relative">
              <span className="">{item.text}</span>
              <span className="absolute -bottom-1 left-1/2 h-[1px] w-0 -translate-x-1/2 rounded-full bg-gray-100 opacity-0 transition-all duration-500 group-hover:w-full group-hover:bg-primary-green3 group-hover:opacity-100"></span>
            </a>
          </Link>
        ))}
      </div>
      <BiMenu
        onClick={toggleMobileNav}
        className="cursor-pointer text-2xl sm:hidden"
      />
    </nav>
  )
}

export default GeneralNavbar
