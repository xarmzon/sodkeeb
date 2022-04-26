import { GENERAL_NAV_ITEMS1, GENERAL_NAV_ITEMS2 } from '@utils/constants'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import GeneralNavbar from '../Navbar/GeneralNavbar'
import GeneralSlider from '../Slider/GeneralSlider'
import MobileNavbar from './MobileNavbar'

const GeneralHeader = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false)
  const router = useRouter()
  const NAV_ITEMS =
    router.asPath.split('/')[1]?.length > 0
      ? GENERAL_NAV_ITEMS2
      : GENERAL_NAV_ITEMS1

  const toggleMobileNav = () => {
    setNavOpen((prev) => !prev)
  }
  return (
    <header className="container w-full">
      <GeneralNavbar toggleMobileNav={toggleMobileNav} navItems={NAV_ITEMS} />
      <MobileNavbar
        navOpen={navOpen}
        toggleMobileNav={toggleMobileNav}
        navItems={NAV_ITEMS}
      />
      <GeneralSlider />
    </header>
  )
}

export default GeneralHeader
