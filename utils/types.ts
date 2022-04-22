import { ReactNode } from 'react'

export type NavLink = {
  icon?: ReactNode
  text: string
  link: string
  isBtn?: boolean
}

export type MessageForm = {
  name: string
  email: string
  message: string
}
export type ProductItems = {
  packSize: string
  dosage?: string
  benefits?: string[]
  ingredients?: string[]
}
export type Product = {
  title: string
  image: string
  description: string
  slug: string
  items: ProductItems
}

export interface INavbar {
  navItems: NavLink[]
  toggleMobileNav: () => void
  navOpen: boolean
}
