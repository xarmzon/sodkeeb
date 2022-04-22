import GeneralLogo from '@components/Common/Logo/GeneralLogo'
import useSticky from '@hooks/useSticky'
import { NavLink } from '@utils/types'

import Link from 'next/link'

const DASHBOARD_NAV: NavLink[] = [
  {
    text: 'Products',
    link: '/dashboard/products',
  },
  {
    text: 'New Product',
    link: '/dashboard/new',
    isBtn: true,
  },
]

const Header = () => {
  const { sticky } = useSticky()
  return (
    <header
      className={`fixed top-0 z-[999] flex h-12 w-full items-center justify-between p-5 lg:p-8 ${
        sticky ? 'bg-gray-100/40 shadow-lg backdrop-blur-[2px]' : 'bg-gray-100'
      } transition-all duration-700`}
    >
      <GeneralLogo />
      <nav className="flex flex-1 items-center justify-end space-x-3">
        {DASHBOARD_NAV.map((item, i) => (
          <Link key={i} href={item.link}>
            <a
              className={`px-3 py-2 ${
                item.isBtn ? 'bg-linearG text-gray-200' : ''
              }`}
            >
              {item.text}
            </a>
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
