import { connectDB, getCustomPaginationData } from '@utils/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import ProductModel from '@models/ProductModel'
import { HTTP_REQUEST_CODES, MESSAGES, PER_PAGE } from '@utils/constants'
import { generateSlug } from '@utils/index'
import { TProductItem } from '@utils/types'
import { userRequired } from '@utils/middleware'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  switch (req.method) {
    case 'GET':
      const q = req.query
      const type = q.type as string
      switch (type) {
        case 'single':
          await getProduct(req, res)
          break

        default:
          await getProducts(req, res)
          break
      }
      break
    case 'POST':
      await addNewProduct(req, res)
      break
    case 'PUT':
      await updateProduct(req, res)
      break
    case 'DELETE':
      await deleteProduct(req, res)
      break

    default:
      res
        .status(HTTP_REQUEST_CODES.METHOD_NOT_ALLOWED)
        .json({ msg: MESSAGES.METHOD_NOT_ALLOWED })
      break
  }
}
export default handler

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const q = req.query

    const product = q.product as string

    if (!product) {
      res
        .status(HTTP_REQUEST_CODES.BAD_REQUEST)
        .json({ msg: MESSAGES.BAD_REQUEST })
      return
    }
    const data = await ProductModel.findById(product).select('-updatedAt -__v')

    if (!data) {
      res
        .status(HTTP_REQUEST_CODES.NOT_FOUND)
        .json({ msg: MESSAGES.NO_PRODUCT_FOUND })
      return
    }

    res.status(HTTP_REQUEST_CODES.OK).json({ product: data })
  } catch (error) {
    console.log(error)
    res
      .status(HTTP_REQUEST_CODES.SERVER_ERROR)
      .json({ msg: MESSAGES.FETCH_LOADING_ERROR })
  }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { search, page, perPage } = req.query
    // console.log(search, page, perPage)

    let pipeline: any[] = []
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            {
              title: {
                $regex: new RegExp(search as string),
                $options: 'i',
              },
            },
            {
              'items.dosage': {
                $regex: new RegExp(search as string),
                $options: 'i',
              },
            },
            {
              'items.packSize': {
                $regex: new RegExp(search as string),
                $options: 'i',
              },
            },
            {
              'items.benefits': {
                $in: [new RegExp(search as string, 'i')],
              },
            },
            {
              'items.ingredients': {
                $in: [new RegExp(search as string, 'i')],
              },
            },
          ],
        },
      })
    }

    const pg = await getCustomPaginationData<TProductItem>(
      pipeline,
      ProductModel,
      page ? Number(page as string) : 1,
      perPage ? Number(perPage as string) : PER_PAGE
    )

    res
      .status(HTTP_REQUEST_CODES.OK)
      .json({ msg: MESSAGES.PRODUCT_FETCH_SUCCESS, ...pg })
  } catch (error) {
    console.log(error)
    res
      .status(HTTP_REQUEST_CODES.SERVER_ERROR)
      .json({ msg: MESSAGES.FETCH_LOADING_ERROR })
  }
}
const addNewProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res)
  try {
    const formData = req.body
    // console.log(formData)
    await ProductModel.create({
      ...formData,
      slug: generateSlug(formData?.title ?? ''),
    })
    res
      .status(HTTP_REQUEST_CODES.CREATED)
      .json({ msg: MESSAGES.NEW_PRODUCT_SUCCESSFUL })
  } catch (error) {
    console.log(error)
    res
      .status(HTTP_REQUEST_CODES.SERVER_ERROR)
      .json({ msg: MESSAGES.NEW_PRODUCT_ERROR })
  }
}
const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res)
  try {
    const formData = req.body
    // console.log(formData)
    if (!formData?._id) {
      res
        .status(HTTP_REQUEST_CODES.BAD_REQUEST)
        .json({ msg: MESSAGES.BAD_REQUEST })
      return
    }

    const product = await ProductModel.findById(formData._id)
    if (!product) {
      res
        .status(HTTP_REQUEST_CODES.NOT_FOUND)
        .json({ msg: MESSAGES.NO_PRODUCT_FOUND })
      return
    }

    product.items = formData.items
    product.title = formData.title
    product.image = formData.image
    product.description = formData.description
    product.slug = generateSlug(formData?.title ?? '')

    await product.save()

    res
      .status(HTTP_REQUEST_CODES.OK)
      .json({ msg: MESSAGES.PRODUCT_UPDATED_SUCCESSFUL })
  } catch (error) {
    console.log(error)
    res
      .status(HTTP_REQUEST_CODES.SERVER_ERROR)
      .json({ msg: MESSAGES.PRODUCT_UPDATE_ERROR })
  }
}
const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res)
  try {
    const q = req.query
    const product = q?.product as string
    if (!product) {
      res
        .status(HTTP_REQUEST_CODES.BAD_REQUEST)
        .json({ msg: MESSAGES.BAD_REQUEST })
      return
    }
    const productExist = await ProductModel.findById(product)
    if (!productExist) {
      res
        .status(HTTP_REQUEST_CODES.NOT_FOUND)
        .json({ msg: MESSAGES.NO_PRODUCT_FOUND })
      return
    }

    await ProductModel.deleteOne({ _id: product })
    res
      .status(HTTP_REQUEST_CODES.CREATED)
      .json({ msg: MESSAGES.PRODUCT_DELETED_SUCCESSFUL })
  } catch (error) {
    console.log(error)
    res
      .status(HTTP_REQUEST_CODES.SERVER_ERROR)
      .json({ msg: MESSAGES.PRODUCT_DELETE_ERROR })
  }
}
