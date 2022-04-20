import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi'
import Image from 'next/image'

const GeneralSlider = () => {
  return (
    <div className="relative h-[calc(50vh-48px)] sm:h-[calc(60vh-48px)]">
      <Swiper
        pagination={{
          clickable: true,
          bulletActiveClass: '!bg-primary-yellow1/70',
          el: '.pagination',
          bulletClass: 'h-3 w-3 bg-primary-gray1/60 mx-1 rounded-full',
        }}
        navigation={{
          nextEl: '.right',
          prevEl: '.left',
          disabledClass: 'text-gray-600 opacity-60 pointer-events-none',
        }}
        modules={[Pagination, Navigation]}
        className="h-full"
      >
        {[...Array(3).fill(0)].map((d, i) => (
          <SwiperSlide
            className={`z-[2] bg-primary-blue2/70 bg-cover bg-center bg-blend-multiply`}
            key={i}
          >
            <Image src={`/images/bg.jpg`} layout="fill" objectFit="cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pagination absolute bottom-1 left-0 right-0 z-[20] flex h-5 w-full justify-center"></div>
      <BiChevronLeftCircle className="left absolute left-3 top-1/2 z-[20] -translate-y-1/2 cursor-pointer text-3xl text-gray-300 transition-colors hover:opacity-80 md:text-4xl xl:text-5xl" />
      <BiChevronRightCircle className="right absolute right-3 top-1/2 z-[20] -translate-y-1/2 cursor-pointer text-3xl text-gray-300 transition-colors hover:opacity-80 md:text-4xl xl:text-5xl" />
    </div>
  )
}

export default GeneralSlider
