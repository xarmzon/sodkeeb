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
  dosage?: string[]
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
export type NewProduct = Omit<Product, 'slug'>
export type UpdateProduct = NewProduct & {
  _id: string
}
export type TProductItem = Product & {
  createdAt: string
  _id: string
}

export type UserState = {
  username: string
  token: string
  loggedIn: boolean
  loading: boolean
}

export type LoginFormData = {
  email: string
  password: string
}

export type AuthSlice = {
  username: string
  token: string
  loggedIn: boolean
  loading: boolean
  loadingLogout: boolean
}

export interface IPaging {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
}

export interface IPagingData<T> {
  results: T[]
  paging: IPaging
}

export interface INavbar {
  navItems: NavLink[]
  toggleMobileNav: () => void
  navOpen: boolean
}
