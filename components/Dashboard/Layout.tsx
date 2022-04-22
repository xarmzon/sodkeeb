import { ReactNode } from 'react'

interface ILayout {
  children: ReactNode
}
const Layout = ({ children }: ILayout) => {
  return <section className="min-h-screen w-full">{children}</section>
}

export default Layout
