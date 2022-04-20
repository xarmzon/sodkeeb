import React from 'react'
import GeneralNavbar from '../Navbar/GeneralNavbar'
import GeneralSlider from '../Slider/GeneralSlider'

const GeneralHeader = () => {
  return (
    <header className="container min-h-[50vh] w-full">
      <GeneralNavbar />
      <GeneralSlider />
    </header>
  )
}

export default GeneralHeader
