import { GENERAL_NAV_ITEMS1 } from '@utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GeneralLogo from '../Logo/GeneralLogo'
import { BiMenu } from 'react-icons/bi'

const GeneralNavbar = () => {
  const router = useRouter()
  console.log(router.asPath)
  return (
    <nav className="flex h-12 w-full items-center justify-between bg-linearG px-5 text-gray-100 md:px-8">
      <GeneralLogo />
      <div className="hidden flex-1 justify-end space-x-5 sm:flex">
        {GENERAL_NAV_ITEMS1.map((item, i) => (
          <Link href={item.link} key={i}>
            <a className="group relative">
              <span className="">{item.text}</span>
              <span className="absolute -bottom-1 left-1/2 h-[1px] w-0 -translate-x-1/2 rounded-full bg-gray-100 opacity-0 transition-all duration-500 group-hover:w-full group-hover:bg-primary-green3 group-hover:opacity-100"></span>
            </a>
          </Link>
        ))}
      </div>
      <BiMenu className="cursor-pointer text-2xl sm:hidden" />
    </nav>
  )
}

export default GeneralNavbar
