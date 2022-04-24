import Button from '@components/Common/Button'
import Layout from '@components/Dashboard/Layout'
import ProductImage from '@components/ProductDetails/ProductImage'
import { getErrorMessage } from '@utils/index'
import { ALLOWED_FILE_SIZE_DP, ROUTES } from '@utils/constants'
import { Product, ProductItems } from '@utils/types'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { BiPlusCircle } from 'react-icons/bi'
import api from '@utils/fetcher'

const addProductText = 'Add Product'

const NewProductPage = () => {
  const imageInputRef = useRef<HTMLInputElement>(null)

  const [showUploadSpinner, setShowUploadSpinner] = useState<boolean>(false)
  const [submitText, setSubmitText] = useState(addProductText)
  const [formData, setFormData] = useState<Omit<Product, 'slug'>>({
    title: '',
    image: '',
    description: '',
    items: {
      benefits: ['', ''],
      ingredients: ['', ''],
      dosage: '',
      packSize: '',
    },
  })

  const [counter, setCounter] = useState<number[]>([
    ...Object.keys(formData.items)
      .filter((key) => key !== 'dosage' && key !== 'packSize')
      .map((d) => 2),
  ])

  useEffect(() => {
    if (showUploadSpinner) {
      toast.loading('Loading Image....')
    } else {
      toast.dismiss()
    }
  }, [showUploadSpinner])

  const openDialogForImage = () => {
    if (!showUploadSpinner || submitText === addProductText)
      imageInputRef?.current?.click()
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0]

    if (file) {
      if (file.size > ALLOWED_FILE_SIZE_DP) {
        toast.error(
          'The Image is too large, please try again with another image less than ' +
            (ALLOWED_FILE_SIZE_DP / 1024).toFixed(1) +
            'KB'
        )
        return
      }
      setFormData((prev) => ({
        ...prev,
        image: '',
      }))
      const reader = new FileReader()
      reader.onloadstart = () => setShowUploadSpinner(true)
      reader.onload = () =>
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }))
      reader.onerror = () => setShowUploadSpinner(false)

      reader.onloadend = () => setShowUploadSpinner(false)

      reader.readAsDataURL(file)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: boolean = false,
    index: number | undefined = undefined
  ) => {
    const key = e.currentTarget.name
    const val = e.currentTarget.value
    if (!item) {
      setFormData((prev) => ({
        ...prev,
        [key]: val,
      }))
    } else {
      let newVal: string | string[]
      const keyVal = formData.items[key as keyof ProductItems]
      const isArray = typeof keyVal === 'object'
      if (!isArray) {
        newVal = val
      } else {
        newVal = [...keyVal]
        newVal[index!] = val
      }
      setFormData((prev) => ({
        ...prev,
        items: {
          ...prev.items,
          [key]: newVal,
        },
      }))
    }
  }

  const handleCounter = (index: number, value: number, key: string) => {
    const c = [...counter]
    c[index] = value
    setCounter(c)
    const k = formData.items[key as keyof ProductItems]!
    if (typeof k === 'object') {
      if (value > k.length) {
        k.push('')
      } else {
        k.pop()
      }
      setFormData((prev) => ({
        ...prev,
        items: {
          ...prev.items,
          [key]: k,
        },
      }))
    }
  }
  const saveProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitText !== addProductText) return
    if (formData.image.length < 1) {
      toast.error('Please choose an image for the project')
      return
    }
    toast.loading('Saving Product...')
    setSubmitText('Saving...')
    try {
      const {
        data: { msg },
      } = await api.post(ROUTES.API.PRODUCTS, { ...formData })
      toast.dismiss()
      toast.success(msg)
      setFormData({
        title: '',
        image: '',
        description: '',
        items: {
          benefits: [
            ...Array(formData.items.benefits?.length || 2)
              .fill(0)
              .map((d) => ''),
          ],
          ingredients: [
            ...Array(formData.items.ingredients?.length || 2)
              .fill(0)
              .map((d) => ''),
          ],
          dosage: '',
          packSize: '',
        },
      })
    } catch (error) {
      toast.dismiss()
      toast.error(getErrorMessage(error))
    }
    setSubmitText(addProductText)
  }

  return (
    <Layout title="New Product">
      <div className="mb-8 flex flex-col space-y-8 md:flex-row-reverse md:space-y-0">
        <div
          onClick={openDialogForImage}
          className="group relative min-h-[280px] w-full overflow-hidden rounded-lg bg-gray-400 transition-all duration-500 md:w-[55%]"
        >
          <span
            className={`absolute inset-0 z-[35] h-full w-full cursor-pointer items-center justify-center bg-primary-dark1/90 text-4xl text-white/40 transition-all duration-500 ${
              formData.image ? 'hidden group-hover:flex' : 'flex'
            }`}
          >
            <BiPlusCircle />
          </span>
          {formData.image && <ProductImage src={formData.image} />}
          <input
            ref={imageInputRef}
            className="hidden"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageUpload}
          />
        </div>
        <div className="w-full md:mr-5 md:w-[45%] lg:mr-8">
          <form onSubmit={saveProduct} className="flex flex-col space-y-5">
            <div className="flex flex-col">
              <input
                className="rounded-lg border-none bg-primary-gray4/70 text-primary-green2 shadow-sm outline-none focus:shadow-lg focus:ring-0"
                type="text"
                name="title"
                onChange={handleChange}
                value={formData.title}
                placeholder="Product Title"
                required
              />
            </div>
            <div className="flex flex-col">
              <textarea
                className="h-40 resize-none rounded-lg border-none bg-primary-gray4/70 text-primary-green2 shadow-sm outline-none scrollbar-thin scrollbar-track-slate-300 focus:shadow-lg focus:ring-0"
                name="description"
                onChange={handleChange}
                value={formData.description}
                placeholder="Product Description"
                required
              />
            </div>
            {Object.keys(formData.items).map((key, i) => {
              const isArray =
                typeof formData.items[key as keyof ProductItems] === 'object'
              return (
                <div key={i} className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex-1 font-semibold capitalize">
                      {key === 'packSize' ? 'Pack Size' : key}:
                    </span>
                    {isArray && (
                      <input
                        className="flex h-10 w-10 appearance-none items-center justify-center rounded-lg border-none bg-primary-gray4/70 outline-none focus:ring-0"
                        type="number"
                        value={counter[i]}
                        min={0}
                        onChange={(e) =>
                          handleCounter(i, Number(e.target.value), key)
                        }
                      />
                    )}
                  </div>
                  {[...Array(counter[i])].map((_, i) => {
                    const nameText = /s$/.test(key)
                      ? key
                          .split('')
                          .filter((_, i) => i !== key.length - 1)
                          .join('')
                      : key
                    const k = key as keyof ProductItems
                    const value = isArray
                      ? formData.items[k]![i]
                      : formData.items[k]

                    return (
                      <input
                        key={i}
                        className="rounded-lg border-none bg-primary-gray4/70 text-primary-green2 shadow-sm outline-none placeholder:capitalize focus:shadow-lg focus:ring-0"
                        type="text"
                        name={key}
                        onChange={(e) =>
                          handleChange(e, true, isArray ? i : undefined)
                        }
                        value={value}
                        placeholder={`${
                          isArray
                            ? nameText + ' text ' + (i + 1)
                            : 'Enter the ' +
                              (/Size/.test(nameText) ? 'Pack Size' : nameText)
                        }`}
                        required={isArray}
                      />
                    )
                  })}
                </div>
              )
            })}
            <div className="flex flex-col items-center justify-center">
              <Button
                type="submit"
                text={submitText}
                disabled={submitText !== addProductText}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NewProductPage
