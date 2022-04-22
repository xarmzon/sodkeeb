import { GENERAL_NAV_ITEMS1, GENERAL_NAV_ITEMS2 } from '@utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GeneralLogo from '../Logo/GeneralLogo'
import { BiMenu, BiX } from 'react-icons/bi'
import { useEffect, useState } from 'react'

const GeneralNavbar = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false)
  const [sticky, setSticky] = useState<boolean>(false)
  const router = useRouter()
  const NAV_ITEMS =
    router.asPath.split('/')[1]?.length > 0
      ? GENERAL_NAV_ITEMS2
      : GENERAL_NAV_ITEMS1
  const toggleMobileNav = () => {
    setNavOpen((prev) => !prev)
  }

  useEffect(() => {
    const stickyNav = () => {
      const scrollY = window.scrollY
      if (scrollY > 1) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
    stickyNav()
    window.addEventListener('scroll', stickyNav)
    return () => window.removeEventListener('scroll', stickyNav)
  }, [])

  return (
    <nav
      className={`flex h-12 w-full items-center justify-between px-5 text-gray-100 md:px-8 ${
        sticky
          ? 'fixed top-0 z-[99] bg-gradient-to-b from-primary-green2/90 to-primary-green/80 backdrop-blur-sm'
          : 'bg-linearG'
      } transition-all duration-700`}
    >
      <GeneralLogo />
      <div className="hidden flex-1 justify-end space-x-5 sm:flex lg:space-x-8 lg:text-lg">
        {NAV_ITEMS.map((item, i) => (
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
      <div
        onClick={toggleMobileNav}
        className={`absolute right-0 top-0 left-0 z-[9999] flex w-full justify-center overflow-x-hidden bg-primary-green2/40 backdrop-blur-sm ${
          navOpen ? 'h-full opacity-100' : 'h-0 opacity-0'
        } transition-all duration-700`}
      >
        <BiX className="absolute top-3 right-5 cursor-pointer text-2xl transition-all duration-700 hover:rotate-[20deg]" />
        <div className="flex h-full w-full flex-col items-center space-y-8 p-5 pt-10">
          {NAV_ITEMS.map((item, i) => (
            <Link href={item.link} key={i}>
              <a className="group relative">
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
