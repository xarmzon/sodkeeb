import { ReactNode } from 'react'

export type NavLink = {
  icon?: ReactNode
  text: string
  link: string
}

export type MessageForm = {
  name: string
  email: string
  message: string
}
