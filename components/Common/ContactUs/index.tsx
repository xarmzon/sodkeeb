import Button from '../Button'
import {
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa'
import { BiMailSend } from 'react-icons/bi'
import { FormEvent, useState } from 'react'
import { MessageForm } from '@utils/types'
import { ChangeEvent } from 'react'
import toast from 'react-hot-toast'
const ContactUs = () => {
  const [formData, setFormData] = useState<MessageForm>({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.currentTarget.name
    const val = e.currentTarget.value

    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }))
  }

  const sendMail = async (e: FormEvent) => {
    e.preventDefault()
    toast.loading('Submitting...')
    setTimeout(() => {
      toast.dismiss()
      toast.success('Your message has been sent successfully')
      setFormData({
        name: '',
        email: '',
        message: '',
      })
    }, 2000)
  }
  return (
    <section
      id="contact"
      className="container my-8 flex flex-col-reverse p-5 sm:flex-row sm:space-x-5 lg:space-x-8 lg:p-8 xl:space-x-12"
    >
      <div className="flex w-full shrink-0 flex-col space-y-5 rounded-xl bg-white p-5 py-8 shadow-s1 sm:w-[45%]">
        <h3 className="text-lg font-bold text-primary-gray1 lg:text-xl">
          We are here for you! How can we help?
        </h3>
        <div className="mt-5 flex flex-col space-y-8 text-primary-gray3">
          <div>
            <h4 className="text-base font-bold sm:text-lg">Head Office:</h4>
            <p className="text-sm sm:text-base">
              No. 1, Oye Olorun Avenue, FOS Estate behind Community Primary
              School Ogunbade Onihale, Ifo, Ogun State.
            </p>
          </div>
          <div>
            <h4 className="text-base font-bold sm:text-lg">Branch Office:</h4>
            <p className="text-sm sm:text-base">
              No. 1, Owoseni Street, Bolade Oshodi, Lagos.
            </p>
          </div>
        </div>
        {/* <form onSubmit={sendMail}>
          <div className="flex flex-col space-y-8">
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="rounded-lg border-none bg-primary-gray4 px-4 pt-3 outline-none ring-0 focus:ring-primary-green/50"
              minLength={3}
              maxLength={50}
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="rounded-lg border-none bg-primary-gray4 px-4 pt-3 outline-none ring-0 focus:ring-primary-green/50"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              placeholder="Go ahead, we're listening..."
              name="message"
              className="h-36 resize-none rounded-lg border-none bg-primary-gray4 px-4 pt-3 outline-none ring-0 focus:ring-primary-green/50"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mt-5">
            <Button text="Send Message" />
          </div>
        </form> */}
      </div>
      <div className="mb-8 flex w-full shrink-0 flex-col space-y-8 sm:mb-0 sm:w-[55%] lg:space-y-10">
        <h3 className="text-4xl font-bold text-primary-green sm:text-5xl lg:text-6xl xl:text-7xl">
          Get in touch.
        </h3>
        <p className="lg:text-lg">
          Connect with us by clicking any of the links below
        </p>
        <div className="grid grid-cols-3 gap-y-5 sm:grid-cols-4">
          <a
            href="https://wa.me/message/DQREHY6Y7AYHB1"
            target="_blank"
            className="flex flex-col items-center justify-center text-center text-[#21c05b] sm:max-w-max"
            rel="noreferrer"
          >
            <FaWhatsapp className="text-xl md:text-2xl" />
            <span className="text-xs">WhatsApp</span>
          </a>
          <a
            href="https://www.facebook.com/sodkeeb/"
            target="_blank"
            className="flex flex-col items-center justify-center text-center text-[#4267b2] sm:max-w-max"
            rel="noreferrer"
          >
            <FaFacebook className="text-xl md:text-2xl" />
            <span className="text-xs">Facebook</span>
          </a>
          <a
            href="https://youtube.com/channel/UCjCvdoGgiedJPy1Sd0ruqmw"
            target="_blank"
            className="flex flex-col items-center justify-center text-center text-[#ff0000] sm:max-w-max"
            rel="noreferrer"
          >
            <FaYoutube className="text-xl md:text-2xl" />
            <span className="text-xs">Youtube</span>
          </a>
          <a
            href="https://www.instagram.com/sodkeeb_trado_medical/"
            target="_blank"
            className="flex flex-col items-center justify-center text-center text-[#e1306c] sm:max-w-max"
            rel="noreferrer"
          >
            <FaInstagram className="text-xl md:text-2xl" />
            <span className="text-xs">Instagram</span>
          </a>
          <a
            href="https://twitter.com/sodkeeb_trado_m"
            target="_blank"
            className="flex flex-col items-center justify-center text-center text-[#13a1f2] sm:max-w-max"
            rel="noreferrer"
          >
            <FaTwitter className="text-xl md:text-2xl" />
            <span className="text-xs">Twitter</span>
          </a>
          <a
            href="mailto:sodkeeb.tradomed@gmail.com"
            className="flex flex-col items-center justify-center text-center text-primary-blue2 sm:max-w-max"
          >
            <BiMailSend className="text-2xl md:text-2xl" />
            <span className="text-xs">Email</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
