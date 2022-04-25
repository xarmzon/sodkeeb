import Loader from '@components/Common/Loader'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiEditAlt, BiXCircle } from 'react-icons/bi'

interface IProductItem {
  id: string
  title: string
  image: string
  description: string
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
  loading: boolean
}

const ProductItem = ({
  id,
  title,
  image,
  description,
  handleDelete,
  handleEdit,
  loading,
}: IProductItem) => {
  return (
    <div
      className={`relative flex max-h-[110px] min-h-[110px] w-full overflow-hidden rounded-lg bg-white shadow-lg sm:max-h-[150px] sm:min-h-[150px]`}
    >
      {loading && (
        <div className="absolute inset-0 z-[3] flex h-full w-full items-center justify-center bg-white/40 backdrop-blur-[2px]">
          <Loader />
        </div>
      )}
      <div className="flex flex-1 flex-shrink-0 space-x-2 p-3">
        <div className="relative min-h-full w-[30%] overflow-hidden rounded-md bg-primary-gray2 md:w-[20%]">
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            alt={`Product Image`}
          />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-sm font-bold line-clamp-2 sm:text-lg">
            {title}
          </h3>
          <p className="text-xs line-clamp-3 sm:text-base">{description}</p>
        </div>
      </div>
      <div className="flex w-10 flex-shrink-0 flex-col items-center text-xl sm:w-14 sm:text-2xl">
        <div className="flex h-1/2 w-full items-center justify-center bg-primary-gray2/70 text-primary-blue2">
          <BiEditAlt
            className=" animate-pulse cursor-pointer"
            onClick={() => handleEdit(id)}
          />
        </div>
        <div className="flex h-1/2 w-full items-center justify-center bg-primary-red2/70 text-primary-red3">
          <BiXCircle
            className="animate-pulse cursor-pointer"
            onClick={() => handleDelete(id)}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductItem
