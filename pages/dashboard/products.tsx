import Loader from '@components/Common/Loader'
import Layout from '@components/Dashboard/Layout'
import ProductItem from '@components/Dashboard/ProductItem'
import usePaginatedFetch from '@hooks/usePaginatedFetch'
import { ROUTES } from '@utils/constants'
import React, { useEffect } from 'react'

const ProductsDashboard = () => {
  const { data, loading, error, handlePagination, handleSearch, page } =
    usePaginatedFetch(ROUTES.API.PRODUCTS)
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <Layout title="Products List">
      {loading ? (
        <div className="min-h-[20vh] w-full">
          <Loader text="Loading Products..." />
        </div>
      ) : (
        <div className="w-full">
          <ProductItem />
        </div>
      )}
    </Layout>
  )
}

export default ProductsDashboard
