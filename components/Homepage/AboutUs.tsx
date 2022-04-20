const AboutUs = () => {
  return (
    <section
      id="about"
      className="container grid min-h-[50vh] w-full grid-cols-12 items-center gap-5 bg-primary-gray4 p-5 sm:p-8"
    >
      <h2 className="col-span-12 text-center text-3xl font-bold sm:col-span-4 sm:text-left sm:text-5xl md:text-6xl lg:col-span-3 lg:text-7xl xl:text-8xl">
        About <span className="sm:block">Us</span>
      </h2>
      <div className="relative col-span-12 flex flex-col space-y-3 sm:col-span-8 md:text-lg md:leading-loose lg:col-span-9 lg:text-lg xl:text-xl xl:leading-7">
        <span className="absolute left-0 right-0 -top-2 h-[2px] w-full rounded-full bg-primary-gray1/40 md:h-[3px]"></span>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, rerum
          earum porro minima expedita animi repudiandae aliquam! Ipsum nam odit
          fuga esse quod, laborum autem cupiditate consequatur doloribus
          accusantium eius, voluptates reiciendis repellendus, facilis non
          similique sed.
        </p>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          quaerat doloribus dolor voluptatibus velit ipsam.
        </p>
      </div>
    </section>
  )
}

export default AboutUs
