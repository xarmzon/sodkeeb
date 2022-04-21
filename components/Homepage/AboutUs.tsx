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
        }}
        viewport={{ once: true }}
        className="col-span-12 text-3xl font-bold text-center sm:col-span-4 sm:text-left sm:text-5xl md:text-6xl lg:col-span-3 lg:text-7xl xl:text-8xl"
      >
        About <span className="sm:block">Us</span>
      </motion.h2>
      <div className="relative flex flex-col col-span-12 space-y-3 sm:col-span-8 md:text-lg md:leading-loose lg:col-span-9 lg:text-lg xl:text-xl xl:leading-7">
        <span className="absolute left-0 right-0 -top-2 h-[2px] w-full rounded-full bg-primary-gray1/40 md:h-[3px]"></span>
        <motion.div
          initial={{
            y: 2,
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="flex flex-col w-full space-y-3"
        >
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
            rerum earum porro minima expedita animi repudiandae aliquam! Ipsum
            nam odit fuga esse quod, laborum autem cupiditate consequatur
            doloribus accusantium eius, voluptates reiciendis repellendus,
            facilis non similique sed.
          </p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            quaerat doloribus dolor voluptatibus velit ipsam.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs
