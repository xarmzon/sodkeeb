import Link from 'next/link'
import React from 'react'

interface ILinkButton {
  link: string
  text: string
}

const LinkButton = ({ link, text }: ILinkButton) => {
  return (
    <Link href={link}>
      <a className="group relative max-w-max rounded-full bg-linearG2 px-3 py-1 text-gray-200 sm:px-4 sm:py-2">
        <span className="text-sm sm:text-base">{text}</span>
        <span className="absolute left-1/2 -bottom-2 -z-[1] h-full w-[80%] -translate-x-1/2 rounded-full bg-primary-green2 blur-sm transition-all duration-500 group-hover:w-[65%] group-hover:blur-md" />
        <span className="absolute right-16 -bottom-2 z-[3] h-full rounded-full bg-primary-blue2/30 blur-lg transition-all duration-500 group-hover:right-2 group-hover:w-[30%]" />
        <span className="absolute left-16 -bottom-2 z-[3] h-full rounded-full bg-primary-yellow1/40 blur-lg transition-all duration-500 group-hover:left-2 group-hover:w-[30%]" />
      </a>
    </Link>
  )
}

export default LinkButton
