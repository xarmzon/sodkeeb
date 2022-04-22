import { exitPage } from '@utils/variants'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Header from './Header'

interface ILayout {
  children: ReactNode
}
const Layout = ({ children }: ILayout) => {
  return (
    <section className="min-h-screen w-full bg-primary-gray2/30">
      <Header />

      <motion.section
        variants={exitPage}
        exit="exit1"
        className="min-h-[300vh] pt-14"
      >
        {children}
      </motion.section>
    </section>
  )
}

export default Layout
