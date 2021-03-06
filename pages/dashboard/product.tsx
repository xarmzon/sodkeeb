import Button from '@components/Common/Button'
import Layout from '@components/Dashboard/Layout'
import ProductImage from '@components/ProductDetails/ProductImage'
import { getErrorMessage } from '@utils/index'
import { ALLOWED_FILE_SIZE_DP, ROUTES } from '@utils/constants'
import { NewProduct, ProductItems, UpdateProduct } from '@utils/types'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { BiPlusCircle } from 'react-icons/bi'
import api from '@utils/fetcher'
import { useRouter } from 'next/router'
import Loader from '@components/Common/Loader'

const addProductText = 'Add Product'
const updateProductText = 'Update Product'

const NewAndUpdateProductPage = () => {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { product } = router.query

  const [loading, setLoading] = useState<boolean>(false)
  const [showUploadSpinner, setShowUploadSpinner] = useState<boolean>(false)
  const [submitText, setSubmitText] = useState<string>(() =>
    product ? updateProductText : addProductText
  )
  const [formData, setFormData] = useState<NewProduct | UpdateProduct>({
    title: '',
    image: '',
    description: '',
    items: {
      benefits: ['', ''],
      ingredients: ['', ''],
      dosage: ['', ''],
      nafdacNo: '',
      packSize: '',
    },
  })

  const [counter, setCounter] = useState<number[]>(() => {
    const keyWithArrayValues = Object.keys(formData.items).filter(
      (d) => typeof formData.items[d as keyof ProductItems] === 'object'
    )
    return [...keyWithArrayValues.map((_) => 2)]
    // return [...Object.keys(formData.items).map((d) => 2)]
  })

  useEffect(() => {
    if (showUploadSpinner) {
      toast.loading('Loading Image....')
    } else {
      toast.dismiss()
    }
  }, [showUploadSpinner])

  useEffect(() => {
    const getProduct = async () => {
      if (product) {
        setLoading(true)
        try {
          const {
            data: { product: pd },
          } = await api.get(
            `${ROUTES.API.PRODUCTS}?type=single&product=${product}`
          )
          setSubmitText(updateProductText)
          setCounter(() => {
            const keyWithArrayValues = Object.keys(pd.items).filter(
              (d) => typeof pd.items[d as keyof ProductItems] === 'object'
            )
            return [...keyWithArrayValues.map((key) => pd.items[key].length)]
          })
          setFormData(pd)
        } catch (err) {
          toast.error(getErrorMessage(err))
        }
        setLoading(false)
      }
    }
    getProduct()
  }, [product])

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
    let k = formData.items[key as keyof ProductItems]!
    if (typeof k === 'object') {
      const closeVal = value - k.length
      if (closeVal > 1 || closeVal < -1) {
        k = [...Array(value).fill('')]
      } else {
        if (value > k.length) {
          k.push('')
        } else {
          k.pop()
        }
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

  const handledSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitText !== addProductText && submitText !== updateProductText)
      return
    if (formData.image.length < 1) {
      toast.error('Please choose an image for the project')
      return
    }
    if (submitText === updateProductText) {
      toast.loading('Updating Product...')
      setSubmitText('Updating...')
    } else {
      toast.loading('Saving Product...')
      setSubmitText('Saving...')
    }
    try {
      const apiD = submitText === updateProductText ? api.put : api.post
      const {
        data: { msg },
      } = await apiD(ROUTES.API.PRODUCTS, { ...formData })
      toast.dismiss()
      toast.success(msg)

      if (submitText === addProductText) {
        setFormData({
          title: '',
          image: '',
          description: '',
          items: {
            benefits: [...Array(formData.items.benefits?.length || 2).fill('')],
            ingredients: [
              ...Array(formData.items.ingredients?.length || 2).fill(''),
            ],
            dosage: [...Array(formData.items.dosage?.length || 2).fill('')],
            nafdacNo: '',
            packSize: '',
          },
        })
      }
    } catch (error) {
      toast.dismiss()
      toast.error(getErrorMessage(error))
    }
    if (product) {
      setSubmitText(updateProductText)
    } else {
      setSubmitText(addProductText)
    }
  }

  return (
    <Layout title={product ? 'Update Product' : 'New Product'}>
      {loading ? (
        <div className="">
          <Loader text="Loading Data..." />
        </div>
      ) : (
        <div className="mb-8 flex flex-col space-y-8 md:flex-row-reverse md:space-y-0">
          <div
            onClick={openDialogForImage}
            className={`group relative w-full overflow-hidden rounded-lg bg-gray-400 transition-all duration-500 md:w-[55%] ${
              !formData.image ? 'h-[280px] md:h-[380px]' : 'h-max'
            }`}
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
            <form onSubmit={handledSubmit} className="flex flex-col space-y-5">
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
                        {/([a-z0-9])([A-Z0-9])/.test(key)
                          ? key.replace(/([a-z0-9])([A-Z0-9])/g, '$1 $2')
                          : key}
                        :
                      </span>
                      {isArray && (
                        <input
                          className="flex h-10 w-10 appearance-none items-center justify-center rounded-lg border-none bg-primary-gray4/70 outline-none scrollbar-thin scrollbar-track-primary-gray2 focus:ring-0 md:w-14"
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
                        : /([a-z0-9])([A-Z0-9])/.test(key)
                        ? key.replace(/([a-z0-9])([A-Z0-9])/g, '$1 $2')
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
                              ? `${nameText} text ${i + 1}`
                              : `Enter the ${nameText}`
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
                  disabled={Boolean(
                    submitText !== addProductText &&
                      submitText !== updateProductText
                  )}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default NewAndUpdateProductPage
