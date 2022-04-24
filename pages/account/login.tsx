import AuthForm from '@components/Auth/AuthForm'
import Footer from '@components/Common/Footer'
import GeneralHeader from '@components/Common/Header/GeneralHeader'
import Loader from '@components/Common/Loader'
import { useAppSelector } from '@redux/store'
import { ROUTES } from '@utils/constants'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const { loggedIn, loading, username } = useAppSelector((state) => state.auth)
  const router = useRouter()
  //const [msgDisplayed, setMsgDisplayed] = useState<boolean>(false)
  useEffect(() => {
    const { msg, redirect } = router.query
    if (!loggedIn && msg) {
      toast.error(msg as string)
      const to = redirect ? (redirect as string) : ''
      router.replace(`${router.route}?redirect=${to}`)
    }
    if (loggedIn) {
      const to = redirect ? (redirect as string) : ''
      router.replace(to ? to : ROUTES.DASHBOARD.PRODUCTS)
    }
  }, [loggedIn, router, router.query])
  return (
    <>
      <NextSeo title="Login" />
      <GeneralHeader />
      <div className="mx-auto max-w-md p-5">
        {loading ? (
          <Loader />
        ) : loggedIn ? (
          <div className="flex h-[10vh] items-center justify-center text-center text-lg text-primary-green2 lg:text-xl">
            You&apos;re now logged in as{' '}
            <span className="ml-1 font-bold">{username}</span>
          </div>
        ) : (
          <AuthForm />
        )}
      </div>
      <Footer hasBackground={false} />
    </>
  )
}

export default LoginPage
