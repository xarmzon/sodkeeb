import { IPaging } from '@utils/types'
import React, { useState } from 'react'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

interface IPagination {
  paging: IPaging
  handlePage: (page: number) => void
  scrollToRef?: React.RefObject<HTMLElement>
  scrollToOffset?: number
}

const Pagination = ({
  paging: { page, perPage, totalItems, totalPages },
  handlePage,
  scrollToRef,
  scrollToOffset = 110,
}: IPagination) => {
  const handleScrollTo = () => {
    if (scrollToRef && scrollToRef?.current) {
      const elTop =
        scrollToRef.current.getBoundingClientRect().top +
        window.scrollY -
        scrollToOffset
      window.scroll({ top: elTop, behavior: 'smooth' })
    }
  }

  const handleChange = (type: 'next' | 'prev') => {
    handleScrollTo()
    switch (type) {
      case 'next':
        // console.log(page + 1)
        if (page < totalItems) {
          handlePage(page + 1)
        }
        break
      case 'prev':
        // console.log(page - 1)
        if (page > 1) {
          handlePage(page - 1)
        }
        break

      default:
        break
    }
  }
  return (
    <div className="flex items-center justify-between space-x-5 rounded-lg bg-white px-4 py-2 shadow-md">
      <FaChevronCircleLeft
        onClick={() => handleChange('prev')}
        className={`cursor-pointer text-2xl ${
          page <= 1 ? 'pointer-events-none text-gray-200' : ''
        }`}
      />
      <span>{`${page}/${totalPages}`}</span>
      <FaChevronCircleRight
        onClick={() => handleChange('next')}
        className={`cursor-pointer text-2xl ${
          page >= totalPages ? 'pointer-events-none text-gray-200' : ''
        }`}
      />
    </div>
  )
}

export default Pagination
