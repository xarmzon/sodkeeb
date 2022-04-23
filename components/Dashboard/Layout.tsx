import Footer from '@components/Common/Footer'
import { exitPage } from '@utils/variants'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { ReactNode } from 'react'
import Header from './Header'

interface ILayout {
  children: ReactNode
  title?: string
}
const Layout = ({ title, children }: ILayout) => {
  return (
    <>
      {title && <NextSeo title={title} />}
      <section className="min-h-screen w-full bg-primary-gray2/30">
        <Header />

        <section className="px-5 pt-20 lg:px-8">
          <div className="mb-6 text-lg font-semibold text-primary-gray3/70">
            {title ?? 'Dashboard'}
          </div>
          <motion.div variants={exitPage} exit="exit1" className="">
            {children}
          </motion.div>
        </section>
        <Footer hasBackground={false} />
      </section>
    </>
  )
}

export default Layout
