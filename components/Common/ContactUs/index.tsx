import Button from '../Button'
import { FaWhatsapp, FaTwitter, FaFacebook } from 'react-icons/fa'
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

        <form onSubmit={sendMail}>
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
        </form>
      </div>
      <div className="mb-8 flex w-full shrink-0 flex-col space-y-8 sm:mb-0 sm:w-[55%] lg:space-y-10">
        <h3 className="text-4xl font-bold text-primary-green sm:text-5xl lg:text-6xl xl:text-7xl">
          Get in touch.
        </h3>
        <div className="flex flex-col space-y-5 text-lg md:text-xl lg:space-y-8">
          <div className="flex items-center space-x-2">
            <FaWhatsapp className="text-primary-gray3" />
            <span className="">+2348141161177</span>
          </div>
          <div className="flex items-center space-x-2">
            <BiMailSend className="text-primary-gray3" />
            <span className="">sodkeeb@mail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaFacebook className="text-primary-gray3" />
            <span className="">fb.com/sodkeeb</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaTwitter className="text-primary-gray3" />
            <span className="">twitter.com/sodkeeb</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
