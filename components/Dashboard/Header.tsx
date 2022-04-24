import GeneralLogo from '@components/Common/Logo/GeneralLogo'
import useSticky from '@hooks/useSticky'
import { ROUTES } from '@utils/constants'
import { NavLink } from '@utils/types'
import Image from 'next/image'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiCartAlt, BiPlusCircle, BiStoreAlt } from 'react-icons/bi'

const DASHBOARD_NAV: NavLink[] = [
  {
    text: 'Products',
    link: ROUTES.DASHBOARD.PRODUCTS,
    icon: <BiCartAlt />,
  },
  {
    text: 'New Product',
    link: ROUTES.DASHBOARD.NEW_PRODUCT,
    isBtn: true,
    icon: <BiPlusCircle />,
  },
]

const Header = () => {
  const router = useRouter()

  const { sticky } = useSticky()
  return (
    <header
      className={`fixed top-0 z-[999] flex h-16 w-full items-center justify-between p-5 lg:p-8 ${
        sticky ? 'bg-gray-100/40 shadow-lg backdrop-blur-[2px]' : 'bg-gray-100'
      } transition-all duration-700`}
    >
      <GeneralLogo />
      <nav className="flex flex-1 items-center justify-center space-x-5 sm:space-x-8">
        {DASHBOARD_NAV.map((item, i) => (
          <Link key={i} href={item.link}>
            <a
              title={item.text}
              className={`flex items-center sm:space-x-2 sm:px-3 sm:py-2 ${
                item.isBtn ? 'rounded-full bg-linearG text-gray-200' : ''
              } ${
                !item.isBtn && item.link === router.route
                  ? 'text-primary-green'
                  : ''
              }`}
            >
              {item.icon && (
                <span className="text-2xl sm:text-lg">{item.icon}</span>
              )}
              <span className="hidden sm:block sm:text-lg">{item.text}</span>
            </a>
          </Link>
        ))}
      </nav>
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary-gray2/60">
        <Image
          src={'/images/sodkeeb_d1.jpg'}
          layout="fill"
          objectFit="cover"
          alt="Display Picture"
        />
      </div>
    </header>
  )
}

export default Header
