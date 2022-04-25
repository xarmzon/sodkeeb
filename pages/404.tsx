import Button from '@components/Common/Button'
import Footer from '@components/Common/Footer'
import GeneralHeader from '@components/Common/Header/GeneralHeader'
import { NextSeo } from 'next-seo'
import React from 'react'

const Error404Page = () => {
  return (
    <>
      <NextSeo title="Page Not Found" />
      <GeneralHeader />

      <div className="m-8 mx-auto flex min-h-[30vh] w-full max-w-lg flex-col items-center justify-center space-y-5 text-center md:min-h-[40vh] lg:min-h-[50vh] lg:space-y-9">
        <h1 className="text-2xl font-bold text-primary-red3 md:text-3xl lg:text-4xl">
          Oops!! Error404
        </h1>
        <p className="text-lg lg:text-xl">
          The page you&apos;re looking for doesn&apos;t exist
        </p>
        <div className="mt-5">
          <Button isLink link="/" text="Go Back Home" />
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Error404Page
