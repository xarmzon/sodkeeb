import { slideDown } from '@utils/variants'
import { motion } from 'framer-motion'

interface IProductTitle {
  text: string
}

const ProductTitle = ({ text }: IProductTitle) => {
  return (
    <motion.h1
      variants={slideDown}
      initial="hidden"
      animate="show"
      className="text-2xl font-bold sm:text-3xl md:text-4xl xl:text-5xl"
    >
      {text}
    </motion.h1>
  )
}

export default ProductTitle
