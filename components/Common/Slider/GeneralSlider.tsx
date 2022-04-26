import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { BiLeftArrowCircle, BiRightArrowCircle } from 'react-icons/bi'
import Image from 'next/image'

const GeneralSlider = () => {
  return (
    <div className="relative h-[calc(50vh)] sm:h-[calc(60vh)] md:h-[calc(70vh)] lg:h-[calc(75vh)] xl:h-[calc(90vh)]">
      <Swiper
        pagination={{
          clickable: true,
          bulletActiveClass: '!bg-primary-yellow1/90',
          el: '.pagination',
          bulletClass: 'h-3 w-3 bg-primary-gray1/60 mx-1 rounded-full',
        }}
        navigation={{
          nextEl: '.right',
          prevEl: '.left',
          disabledClass: 'text-gray-600 opacity-60 pointer-events-none',
        }}
        autoplay={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="h-full"
      >
        {[...Array(3).fill(0)].map((d, i) => (
          <SwiperSlide className={`relative bg-cover bg-center`} key={i}>
            <span className="absolute inset-0 z-[4] h-full w-full bg-primary-blue2/40" />
            <Image
              src={`/images/sodkeeb_slider1.jpg`}
              layout="fill"
              objectFit="cover"
              alt={`Products slider Image`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pagination absolute bottom-1 left-0 right-0 z-[20] flex h-5 w-full justify-center"></div>
      <BiLeftArrowCircle className="left absolute left-5 top-1/2 z-[20] -translate-y-1/2 cursor-pointer text-3xl text-gray-300 transition-colors hover:opacity-80 md:text-4xl xl:text-5xl" />
      <BiRightArrowCircle className="right absolute right-5 top-1/2 z-[20] -translate-y-1/2 cursor-pointer text-3xl text-gray-300 transition-colors hover:opacity-80 md:text-4xl xl:text-5xl" />
    </div>
  )
}

export default GeneralSlider
