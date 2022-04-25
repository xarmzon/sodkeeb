import { slideUp } from '@utils/variants'
import { motion } from 'framer-motion'

interface IItemList {
  title: string
  items: string[] | string
}
const ItemList = ({ title, items }: IItemList) => {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
      }}
      className="flex flex-col space-y-2"
    >
      <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">{title}</h2>
      {typeof items === 'string' ? (
        <p className="sm:text-lg lg:text-xl">{items}</p>
      ) : items.length === 1 ? (
        <p className="sm:text-lg lg:text-xl">{items.join(' ')}</p>
      ) : (
        <ul className="">
          {items.map((item: string, i: number) => (
            <li
              key={i}
              className="relative ml-3 before:absolute before:top-1/2 before:-left-3 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-primary-green sm:text-lg lg:text-xl"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

export default ItemList
