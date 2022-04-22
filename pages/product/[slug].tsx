import GeneralHeader from '@components/Common/Header/GeneralHeader'
import { NextSeo } from 'next-seo'
import ItemList from '@components/ProductDetails/ItemList'
import ProductImage from '@components/ProductDetails/ProductImage'
import ProductDescription from '@components/ProductDetails/ProductDescription'
import ProductTitle from '@components/ProductDetails/ProductTitle'
import ContactUs from '@components/Common/ContactUs'
import Footer from '@components/Common/Footer'

const ProductDetailPage = () => {
  const productTitle = 'The Title of the Product Here'
  return (
    <>
      <NextSeo title={productTitle} />
      <GeneralHeader />
      <div className="container mb-8 flex flex-col space-y-7 overflow-hidden p-5 pt-8 md:mb-10 md:p-8 md:pt-12 lg:mb-16 lg:space-y-10 lg:pt-16">
        <ProductTitle text={productTitle} />
        <div className="flex w-full flex-col space-y-5 lg:flex-row lg:space-y-0 lg:space-x-8">
          <div className="flex-1 shrink-0">
            <ProductImage src={`/images/sodkeeb_product2.jpg`} />
          </div>
          <div className="flex flex-1 flex-col space-y-5 lg:space-y-8">
            <ProductDescription
              desc={`
             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
             deserunt eveniet dolores nulla, ut, ipsa iusto ad voluptatum
             eligendi porro, nesciunt quidem quibusdam Magnam quibusdam maxime
             autem perferendis similique eum!
          `}
            />
            <ItemList
              title="Benefits"
              items={[
                'Lorem ipsum dolor sit amet.',
                'Lorem ipsum dolor sit amet2',
                'Lorem ipsum dolor sit amet3',
              ]}
            />
            <ItemList title="Dosage" items={'Lorem ipsum dolor sit amet.'} />
          </div>
        </div>
      </div>
      <ContactUs />
      <Footer />
    </>
  )
}

export default ProductDetailPage
