import Button from '@components/Common/Button'
import { getErrorMessage } from '@utils/index'
import { ROUTES } from '@utils/constants'
import api from '@utils/fetcher'
import { LoginFormData } from '@utils/types'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import AuthContext, { ACTIONS } from '@context/auth'

const loginText = 'Login to Dashboard'

const AuthForm = () => {
  const { dispatch } = useContext(AuthContext)
  const [submitText, setSubmitText] = useState(loginText)
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.currentTarget.name
    const val = e.currentTarget.value
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }))
  }
  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitText !== loginText) return
    setSubmitText('Checking...')
    toast.loading('Checking...')
    try {
      const {
        data: { msg, user },
      } = await api.post(ROUTES.API.LOGIN, { ...formData })
      toast.dismiss()
      toast.success(msg)
      setSubmitText(loginText)
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({
        type: ACTIONS.SET_USER,
        payload: { token: user.token, username: user.username },
      })
    } catch (error) {
      toast.dismiss()
      toast.error(getErrorMessage(error))
      setSubmitText(loginText)
    }
  }
  return (
    <div className="mx-auto my-8 min-h-[200px] max-w-sm rounded-md bg-white/50 p-5 shadow-lg backdrop-blur-sm">
      <h3 className="mb-5 text-center text-lg font-bold text-primary-gray1">
        PLEASE LOGIN FIRST
      </h3>
      <form onSubmit={loginUser} className="flex flex-col space-y-8">
        <div className="flex flex-col">
          <input
            className="rounded-lg border-none bg-primary-gray4/70 text-primary-green2 shadow-sm outline-none focus:shadow-lg focus:ring-0"
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col">
          <input
            className="rounded-lg border-none bg-primary-gray4/70 text-primary-green2 shadow-sm outline-none focus:shadow-lg focus:ring-0"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Button
            type="submit"
            text={submitText}
            disabled={submitText !== loginText}
          />
        </div>
      </form>
    </div>
  )
}

export default AuthForm
