import Loader from '@components/Common/Loader'
import Pagination from '@components/Pagination'
import usePaginatedFetch from '@hooks/usePaginatedFetch'
import { MESSAGES, ROUTES } from '@utils/constants'
import { Product as ProductType, TProductItem } from '@utils/types'
import React, { useRef } from 'react'
import Product from './Product'

interface IProductsList {
  products: ProductType[]
}

const ProductsList = () => {
  const scrollToRef = useRef<HTMLDivElement>(null)
  const {
    data,
    loading: dataLoading,
    error,
    handlePagination,
    handleSearch,
    page,
    mutate,
  } = usePaginatedFetch(ROUTES.API.PRODUCTS)

  return (
    <div className="mt-10 flex w-full flex-col space-y-16 md:mt-12 lg:mt-14">
      {dataLoading ? (
        <div className="min-h-full w-full">
          <Loader text="Loading Products..." />
        </div>
      ) : (
        <div className="h-full w-full">
          {data?.results?.length > 0 ? (
            <>
              <div
                ref={scrollToRef}
                className="flex w-full flex-col space-y-14 md:space-y-16 lg:space-y-20"
              >
                {data?.results?.map((item: TProductItem, i: number) => (
                  <Product
                    link={`${ROUTES.PRODUCT_DETAILS}/${item.slug}`}
                    img={item.image}
                    key={i}
                    description={item.description}
                    title={item.title}
                    imagePosition={i % 2 === 0 ? 'left' : 'right'}
                  />
                ))}
              </div>
              <div className="my-16 flex w-full justify-center lg:mt-24">
                <Pagination
                  paging={data?.paging}
                  handlePage={handlePagination}
                  scrollToRef={scrollToRef}
                  scrollToOffset={180}
                />
              </div>
            </>
          ) : (
            <div className="flex min-h-full items-center justify-center text-center text-lg font-bold text-primary-red3">
              {MESSAGES.NO_DATA_TO_DISPLAY}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductsList
