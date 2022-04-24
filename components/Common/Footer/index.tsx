import { APP_NAME } from '@utils/constants'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'

interface IFooter {
  hasBackground?: boolean
}

const Footer = ({ hasBackground = true }: IFooter) => {
  return (
    <footer
      className={`flex flex-col items-center justify-center py-8 px-5 text-center text-xs sm:text-sm lg:text-lg ${
        hasBackground ? 'bg-primary-green text-gray-200' : ''
      }`}
    >
      <span>
        Copyright {new Date().getFullYear()}{' '}
        <span className="font-semibold">{APP_NAME}</span>. All right reserved.
      </span>
      <span className="flex items-center">
        Crafted with <AiFillHeart className="mx-1 text-red-500" /> by
        <a
          className={`ml-1 ${
            hasBackground ? 'text-primary-yellow1' : 'text-primary-green2'
          }`}
          href="https://www.linkedin.com/in/rastaxarm"
          target="_blank"
          rel="noreferrer"
        >
          Rastaarc
        </a>
      </span>
    </footer>
  )
}

export default Footer
