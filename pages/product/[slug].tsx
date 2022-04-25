import GeneralHeader from '@components/Common/Header/GeneralHeader'
import { NextSeo } from 'next-seo'
import ItemList from '@components/ProductDetails/ItemList'
import ProductImage from '@components/ProductDetails/ProductImage'
import ProductDescription from '@components/ProductDetails/ProductDescription'
import ProductTitle from '@components/ProductDetails/ProductTitle'
import ContactUs from '@components/Common/ContactUs'
import Footer from '@components/Common/Footer'
import { GetServerSideProps } from 'next'
import { TProductItem } from '@utils/types'
import ProductModel from '@models/ProductModel'
import { useState } from 'react'

interface IProductDetailPage {
  productData: string
  foundProduct: boolean
}

const ProductDetailPage = ({
  productData,
  foundProduct,
}: IProductDetailPage) => {
  const [product, _] = useState<TProductItem | null>(() => {
    return productData ? JSON.parse(productData) : null
  })
  return (
    <>
      <NextSeo title={product?.title ?? 'Unknown Product'} />
      <GeneralHeader />
      <div className="container mb-8 flex flex-col space-y-7 overflow-hidden p-5 pt-8 md:mb-10 md:p-8 md:pt-12 lg:mb-16 lg:space-y-10 lg:pt-16">
        <ProductTitle text={product?.title ?? 'Unknown Product'} />
        <div className="flex w-full flex-col space-y-5 lg:flex-row lg:space-y-0 lg:space-x-8">
          <div className="flex-1 shrink-0">
            <ProductImage
              alt={product?.title ?? 'Sodkeeb Product'}
              src={product?.image ? product?.image : '/images/sodkeeb_d1.jpg'}
            />
          </div>
          <div className="flex flex-1 flex-col space-y-5 lg:space-y-8">
            <ProductDescription
              desc={
                product?.description
                  ? product?.description
                  : 'Unknown Product Description'
              }
            />
            {product?.items?.benefits && (
              <ItemList title="Benefits" items={product?.items?.benefits} />
            )}
            {product?.items?.ingredients && (
              <ItemList
                title="Ingredients"
                items={product?.items?.ingredients}
              />
            )}
            {product?.items?.dosage && (
              <ItemList title="Ingredients" items={product?.items?.dosage} />
            )}
            {product?.items?.packSize && (
              <ItemList title="Pack Size(s)" items={product?.items?.packSize} />
            )}
          </div>
        </div>
      </div>
      <ContactUs />
      <Footer />
    </>
  )
}

export default ProductDetailPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let foundProduct: boolean = false
  let product: TProductItem | undefined | null
  const q = query
  const slug = q.slug as string
  console.log(slug)
  if (slug) {
    product = await ProductModel.findOne({ slug })
  }
  return {
    props: {
      productData: JSON.stringify(product ? product : '', undefined, 4),
      foundProduct,
    },
  }
}
