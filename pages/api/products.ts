import { connectDB } from './../../utils/database'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ProductModel from '@models/ProductModel'
import { HTTP_REQUEST_CODES, MESSAGES } from '@utils/constants'

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
    res.status(HTTP_REQUEST_CODES.OK).json({ msg: 'Products' })
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
    console.log(formData)
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
