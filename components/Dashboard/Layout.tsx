import AuthForm from '@components/Auth/AuthForm'
import Footer from '@components/Common/Footer'
import Loader from '@components/Common/Loader'
import AuthContext from '@context/auth'
import { exitPage } from '@utils/variants'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { ReactNode, useContext } from 'react'
import Header from './Header'

interface ILayout {
  children: ReactNode
  title?: string
}
const Layout = ({ title, children }: ILayout) => {
  const {
    userState: { loggedIn, loading },
  } = useContext(AuthContext)

  return (
    <>
      {title && <NextSeo title={title} />}
      <section className="min-h-screen w-full bg-primary-gray2/30">
        <Header />

        <section className="px-5 pt-20 lg:px-8">
          {loggedIn && (
            <div className="mb-6 text-lg font-semibold text-primary-gray3/70">
              {title ?? 'Dashboard'}
            </div>
          )}
          <motion.div variants={exitPage} exit="exit1" className="">
            {loading ? (
              <div className="flex h-full w-full items-center justify-center">
                <Loader text="Loading..." />
              </div>
            ) : loggedIn ? (
              { children }
            ) : (
              <AuthForm />
            )}
          </motion.div>
        </section>
        <Footer hasBackground={false} />
      </section>
    </>
  )
}

export default Layout
