import { Product as ProductType } from '@utils/types'
import React from 'react'
import Product from './Product'

interface IProductsList {
  products: ProductType[]
}

const ProductsList = () => {
  return (
    <div className="mt-10 flex w-full flex-col space-y-16 md:mt-12 lg:mt-14">
      {[...Array(3).fill(0)].map((d, i) => (
        <Product
          link={`/product/${i + 1}`}
          img={`/images/sodkeeb_product1.jpg`}
          key={i}
          description={`Lorem ipsum dolor ipsum doloripsum doloripsum dolor ipsum dolor ipsum dolor ipsum dolor ipsum dolor sit amet consectetur, adipisicing elit. Sed, possimus?`}
          title={`Product Title`}
          imagePosition={i % 2 === 0 ? 'left' : 'right'}
        />
      ))}
    </div>
  )
}

export default ProductsList
