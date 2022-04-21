import { GENERAL_NAV_ITEMS1 } from '@utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GeneralLogo from '../Logo/GeneralLogo'
import { BiMenu, BiX } from 'react-icons/bi'
import { useState } from 'react'

const GeneralNavbar = () => {
  const [navOpen, setNavOpen] = useState<boolean>(true)
  const router = useRouter()
  console.log(router.asPath)
  const toggleMobileNav = () => {
    setNavOpen((prev) => !prev)
  }
  return (
    <nav className="flex items-center justify-between w-full h-12 px-5 text-gray-100 bg-linearG md:px-8">
      <GeneralLogo />
      <div className="justify-end flex-1 hidden space-x-5 sm:flex">
        {GENERAL_NAV_ITEMS1.map((item, i) => (
          <Link href={item.link} key={i}>
            <a className="relative group">
              <span className="">{item.text}</span>
              <span className="absolute -bottom-1 left-1/2 h-[1px] w-0 -translate-x-1/2 rounded-full bg-gray-100 opacity-0 transition-all duration-500 group-hover:w-full group-hover:bg-primary-green3 group-hover:opacity-100"></span>
            </a>
          </Link>
        ))}
      </div>
      <BiMenu
        onClick={toggleMobileNav}
        className="text-2xl cursor-pointer sm:hidden"
      />
      <div
        onClick={toggleMobileNav}
        className={`absolute right-0 top-0 left-0 z-[9999] flex w-full justify-center overflow-x-hidden bg-primary-green2/40 backdrop-blur-sm ${
          navOpen ? 'h-full opacity-100' : 'h-0 opacity-0'
        } transition-all duration-700`}
      >
        <BiX className="absolute top-3 right-5 cursor-pointer text-2xl transition-all duration-700 hover:rotate-[20deg]" />
        <div className="flex flex-col items-center w-full h-full p-5 pt-10 space-y-8">
          {GENERAL_NAV_ITEMS1.map((item, i) => (
            <Link href={item.link} key={i}>
              <a className="relative group">
                <span className="">{item.text}</span>
                <span className="absolute -bottom-1 left-1/2 h-[1px] w-0 -translate-x-1/2 rounded-full bg-gray-100 opacity-0 transition-all duration-500 group-hover:w-full group-hover:bg-primary-green3 group-hover:opacity-100"></span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default GeneralNavbar
