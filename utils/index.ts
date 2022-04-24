import slugify from 'slugify'
import { MESSAGES } from './constants'
import jwt from 'jsonwebtoken'

export const generateToken = (data: any) => {
  const key = process.env.JWT_SECRET_KEY!
  return jwt.sign(data, key, { expiresIn: '1d', subject: 'User Access Token' })
}

export const verifyToken = (token: string) => {
  const key = process.env.JWT_SECRET_KEY!
  return jwt.verify(token, key)
}
export const generateSlug = (title: string) => {
  const slug = slugify(title, {
    lower: true,
  })

  return slug
}

export const getErrorMessage = (e: any) => {
  return e?.response?.msg
    ? e?.response?.msg
    : e?.response?.data?.msg
    ? e?.response?.data?.msg
    : e?.message
    ? e?.message
    : MESSAGES.GENERAL_ERROR_MESSAGE
}
