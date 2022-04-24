import { connectDB, getCustomPaginationData } from '@utils/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import ProductModel from '@models/ProductModel'
import { HTTP_REQUEST_CODES, MESSAGES, PER_PAGE } from '@utils/constants'
import { generateSlug } from '@utils/index'
import { TProductItem } from '@utils/types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  switch (req.method) {
    case 'GET':
      await getProducts(req, res)
      break
    case 'POST':
      await addNewProduct(req, res)
      break

    default:
      res
        .status(HTTP_REQUEST_CODES.METHOD_NOT_ALLOWED)
        .json({ msg: MESSAGES.METHOD_NOT_ALLOWED })
      break
  }
}
export default handler

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { search, page, perPage } = req.query
    console.log(search, page, perPage)

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
