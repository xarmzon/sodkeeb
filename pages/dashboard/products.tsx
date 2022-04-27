import Loader from '@components/Common/Loader'
import Layout from '@components/Dashboard/Layout'
import ProductItem from '@components/Dashboard/ProductItem'
import usePaginatedFetch from '@hooks/usePaginatedFetch'
import { ROUTES } from '@utils/constants'
import React, { useEffect, useRef, useState } from 'react'
import { TProductItem } from '@utils/types'
import { MESSAGES } from '@utils/constants'
import toast from 'react-hot-toast'
import { getErrorMessage } from '@utils/index'
import api from '@utils/fetcher'
import { useRouter } from 'next/router'
import Pagination from '@components/Pagination'

const ProductsDashboard = () => {
  const scrollToRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const {
    data,
    loading: dataLoading,
    error,
    handlePagination,
    handleSearch,
    page,
    mutate,
  } = usePaginatedFetch(ROUTES.API.PRODUCTS)
  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const [loading, setLoading] = useState<boolean>(false)
  const handleEdit = (id: string) => {
    setLoading(true)
    router.push(`${ROUTES.DASHBOARD.PRODUCT}?product=${id}`)
  }
  const handleDelete = async (id: string) => {
    const title = data?.results?.find((d: TProductItem) => d._id === id)?.title
    const ans = confirm(`Are you sure you want to delete ${title}`)
    if (ans) {
      setLoading(true)
      try {
        const {
          data: { msg },
        } = await api.delete(`${ROUTES.API.PRODUCTS}?product=${id}`)
        mutate()
        toast.success(msg)
      } catch (err) {
        toast.error(getErrorMessage(err))
      }
      setLoading(false)
    }
  }
  return (
    <Layout title="Products List">
      {dataLoading ? (
        <div className="min-h-[60vh] w-full">
          <Loader text="Loading Products..." />
        </div>
      ) : (
        <div className="mx-auto flex min-h-[55vh] w-full max-w-3xl flex-col space-y-10">
          {data?.results?.length > 0 ? (
            <div ref={scrollToRef} className="h-full w-full">
              <div className="flex w-full flex-col space-y-8">
                {data?.results?.map((item: TProductItem, i: number) => (
                  <ProductItem
                    image={item.image}
                    description={item.description}
                    id={item._id}
                    title={item.title}
                    key={i}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    loading={loading}
                  />
                ))}
              </div>
              <div className="mt-10 flex w-full justify-center">
                <Pagination
                  paging={data?.paging}
                  handlePage={handlePagination}
                  scrollToRef={scrollToRef}
                />
              </div>
            </div>
          ) : (
            <div className="flex min-h-[40vh] items-center justify-center text-center text-lg font-bold text-primary-red3">
              {MESSAGES.NO_DATA_TO_DISPLAY}
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}

export default ProductsDashboard
