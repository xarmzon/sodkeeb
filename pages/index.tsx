import GeneralHeader from '@components/Common/Header/GeneralHeader'
import AboutUs from '@components/Homepage/AboutUs'
import Products from '@components/Homepage/Products'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="100% Herbal" />
      <GeneralHeader />
      <AboutUs />
      <Products />
    </>
  )
}

export default Home
