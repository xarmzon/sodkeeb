import Button from '@components/Common/Button'
import Image from 'next/image'

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
      <div className="relative min-h-[250px] w-full flex-1 shrink-0 overflow-hidden rounded-lg sm:min-h-[350px] md:min-h-[300px] lg:min-h-[380px] xl:min-h-[420px]">
        <Image
          src={`/images/product.jpg`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="flex flex-col flex-1 space-y-3 shrink-0 md:space-y-5">
        <h3 className="text-lg font-bold line-clamp-3 sm:text-xl lg:text-3xl">
          {title}
        </h3>
        <p className="text-sm line-clamp-6 sm:text-base lg:text-lg">
          {description}
        </p>
        <Button link={link} text="Product Details" isLink />
      </div>
    </div>
  )
}

export default Product
