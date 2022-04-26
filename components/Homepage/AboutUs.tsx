import { APP_NAME } from '@utils/constants'
import { motion } from 'framer-motion'

const AboutUs = () => {
  return (
    <section
      id="about"
      className="container grid min-h-[50vh] w-full grid-cols-12 items-center gap-5 bg-primary-gray4 p-5 sm:p-8"
    >
      <motion.h2
        initial={{
          y: -4,
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
          },
        }}
        viewport={{ once: true }}
        className="col-span-12 text-center text-3xl font-bold sm:col-span-4 sm:text-left sm:text-5xl md:text-6xl lg:col-span-3 lg:text-7xl xl:text-8xl"
      >
        About <span className="sm:block">Us</span>
      </motion.h2>
      <div className="relative col-span-12 flex flex-col space-y-3 sm:col-span-8 md:text-lg md:leading-loose lg:col-span-9 lg:text-lg xl:text-xl xl:leading-7">
        <span className="absolute left-0 right-0 -top-2 h-[2px] w-full rounded-full bg-primary-gray1/40 md:h-[3px]"></span>
        <motion.div
          initial={{
            y: 2,
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.4,
              duration: 0.9,
            },
          }}
          viewport={{ once: true }}
          className="flex w-full flex-col space-y-3"
        >
          <p className="">
            <span className="font-semibold">{APP_NAME}</span> is a medical
            health center that has solutions to your problems such as
            Infertility, Weak Erection, Back & Waist Pain, Pile Related
            problems, Sexually Transmitted Diseases, Genital Infections,
            Diabetes, Gonorrhea, Low Sperm Count, Staphylococcus, Fibroid, Ulcer
            and all Internal & External health issues using Herbal and Natural
            Products.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs
