import { APP_NAME } from '@utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ILogo {
  hasBackground?: boolean
  className?: string
  useSmall?: boolean
  sticky?: boolean
}

const GeneralLogo = ({
  className = '',
  useSmall = false,
  hasBackground = true,
  sticky = false,
}: ILogo) => {
  return (
    <Link href="/">
      <a
        className={`relative mr-6 flex shrink-0 items-center justify-center rounded-full p-2 ${
          hasBackground ? 'bg-gray-100' : ''
        } ${
          useSmall
            ? '!mt-0 h-10 w-10 sm:!mt-0'
            : 'mt-10 h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20'
        } ${
          !sticky ? 'shadow-md' : 'shadow-none'
        } transition-all duration-500 ${className}`}
      >
        <Image
          src="/images/logo.png"
          layout="fill"
          objectFit="contain"
          alt={`${APP_NAME} logo`}
        />
      </a>
    </Link>
  )
}

export default GeneralLogo
