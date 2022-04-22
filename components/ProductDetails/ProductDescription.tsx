import { slideUp } from '@utils/variants'
import { motion } from 'framer-motion'

interface IProductDescription {
  desc: string
}

const ProductDescription = ({ desc }: IProductDescription) => {
  return (
    <motion.p
      variants={slideUp}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
      }}
      className="md:text-lg lg:text-xl"
    >
      {desc}
    </motion.p>
  )
}

export default ProductDescription
