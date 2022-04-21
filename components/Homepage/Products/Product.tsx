import Button from '@components/Common/Button'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface IProduct {
  imagePosition: 'right' | 'left'
  title: string
  description: string
  link: string
  img: string
}

const Product = ({
  img,
  title,
  description,
  imagePosition,
  link,
}: IProduct) => {
  return (
    <div
      className={`relative flex w-full flex-col space-y-5 md:items-center md:space-y-0 md:space-x-8 lg:space-x-10 ${
        imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <motion.div
        initial={{
          y: 10,
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 1,
          },
        }}
        viewport={{ once: true }}
        className="relative min-h-[250px] w-full flex-1 shrink-0 overflow-hidden rounded-lg sm:min-h-[350px] md:min-h-[300px] lg:min-h-[380px] xl:min-h-[420px]"
      >
        <Image
          src={`/images/product.jpg`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </motion.div>
      <motion.div
        initial={{
          y: -20,
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.7,
            duration: 0.9,
          },
        }}
        viewport={{ once: true }}
        className="flex flex-col flex-1 space-y-3 shrink-0 md:space-y-5"
      >
        <h3 className="text-lg font-bold line-clamp-3 sm:text-xl lg:text-3xl">
          {title}
        </h3>
        <p className="text-sm line-clamp-6 sm:text-base lg:text-lg">
          {description}
        </p>
        <Button link={link} text="Product Details" isLink />
      </motion.div>
    </div>
  )
}

export default Product
