import Loader from '@components/Common/Loader'
import { MESSAGES } from '@utils/constants'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const LogoutPage = () => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('user')
      toast.success(MESSAGES.LOGOUT_SUCCESSFUL)
      router.push('/')
    }, 3000)
  }, [])
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader />
    </div>
  )
}

export default LogoutPage
