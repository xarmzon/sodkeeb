import Button from '@components/Common/Button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { imageVariant } from '@utils/variants'

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
        variants={imageVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative min-h-[300px] w-full flex-1 shrink-0 overflow-hidden rounded-lg sm:min-h-[400px] md:min-h-[300px] lg:min-h-[380px] xl:min-h-[420px]"
      >
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={`image for ${title}`}
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
        className="flex flex-1 shrink-0 flex-col space-y-3 md:space-y-5"
      >
        <h3 className="text-lg font-bold line-clamp-2 sm:text-xl lg:text-3xl">
          {title}
        </h3>
        <p className="text-sm line-clamp-5 sm:text-base lg:text-lg">
          {description}
        </p>
        <Button link={link} text="Product Details" isLink />
      </motion.div>
    </div>
  )
}

export default Product
