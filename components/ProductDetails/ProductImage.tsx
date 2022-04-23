import Image from 'next/image'
import { motion } from 'framer-motion'
import { imageVariant } from '@utils/variants'
import { BiPlusCircle } from 'react-icons/bi'

interface IProductImage {
  src: string
  alt?: string
  showChangeIcon?: boolean
}
const ProductImage = ({
  src,
  alt = '',
  showChangeIcon = false,
}: IProductImage) => {
  return (
    <motion.div
      variants={imageVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative h-[280px] w-full flex-1 shrink-0 overflow-hidden rounded-lg sm:h-[480px] md:h-[450px] lg:h-[400px] xl:h-[480px]"
    >
      <span className="absolute inset-0 z-[35] hidden h-full w-full cursor-pointer items-center justify-center bg-primary-dark1/90 text-4xl text-white/40 transition-all duration-500 group-hover:flex">
        <BiPlusCircle />
      </span>
      <Image
        src={src}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt={alt}
      />
    </motion.div>
  )
}

export default ProductImage
