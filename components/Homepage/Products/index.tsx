import ProductsList from './ProductsList'

const Products = () => {
  return (
    <section
      id="products"
      className="container relative w-full p-5 sm:p-6 lg:p-8"
    >
      <h2 className="relative max-w-sm mx-auto text-3xl font-bold text-center md:text-4xl">
        <span className="">Our Products</span>
        <span className="absolute left-1/2 -bottom-3 h-[3px] w-[30%] -translate-x-1/2 rounded-full bg-primary-red1/90" />
      </h2>
      <ProductsList />
    </section>
  )
}

export default Products
