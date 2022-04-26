import Footer from '@components/Common/Footer'
import Loader from '@components/Common/Loader'
import { exitPage } from '@utils/variants'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { ReactNode, useEffect } from 'react'
import Header from './Header'
import { useAppSelector } from '@redux/store'
import { useRouter } from 'next/router'
import { MESSAGES, ROUTES } from '@utils/constants'
interface ILayout {
  children: ReactNode
  title?: string
}
const Layout = ({ title, children }: ILayout) => {
  const { loading, loggedIn } = useAppSelector((store) => store.auth)
  const router = useRouter()
  useEffect(() => {
    if (!loading && !loggedIn) {
      router.push(
        `${ROUTES.ACCOUNT.LOGIN}?redirect=${ROUTES.DASHBOARD.PRODUCTS}&msg=${MESSAGES.LOGIN_REQUIRED}`
      )
      return
    }
  }, [loading, loggedIn, router])
  return (
    <>
      {title && <NextSeo title={title} />}
      <section className="min-h-screen w-full bg-primary-gray2/30">
        <Header />

        <section className="px-5 pt-20 lg:px-8">
          {loggedIn && (
            <div className="my-10 text-lg font-semibold text-primary-gray3/70">
              {title ?? 'Dashboard'}
            </div>
          )}
          {loading || !loggedIn ? (
            <div className="flex h-[calc(75vh-48px)] w-full items-center justify-center">
              <Loader text="Checking User..." />
            </div>
          ) : (
            <motion.div variants={exitPage} exit="exit1" className="">
              {children}
            </motion.div>
          )}
        </section>
        <Footer hasBackground={false} />
      </section>
    </>
  )
}

export default Layout
