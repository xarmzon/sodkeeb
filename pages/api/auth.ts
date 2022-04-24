import { connectDB } from '@utils/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { HTTP_REQUEST_CODES, MESSAGES } from '@utils/constants'
import { generateToken } from '@utils/index'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  switch (req.method) {
    case 'GET':
      const { verify } = req.query
      if (verify) {
        await verifyUser(req, res)
      } else {
        await getUserDetails(req, res)
      }
      break
    case 'POST':
      await loginUser(req, res)
      break

    default:
      res
        .status(HTTP_REQUEST_CODES.METHOD_NOT_ALLOWED)
        .json({ msg: MESSAGES.METHOD_NOT_ALLOWED })
      break
  }
}
export default handler

const verifyUser = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.headers)
  res.status(200).json({ msg: 'done' })
}

const getUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ user: '' })
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(process.env.ADMIN_PASS, process.env.ADMIN_EMAIL)
    const { email, password } = req.body
    if (
      !email ||
      !password ||
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASS
    ) {
      return res
        .status(HTTP_REQUEST_CODES.BAD_REQUEST)
        .json({ msg: MESSAGES.LOGIN_ERROR })
    }

    const user = {
      token: generateToken({ isAdmin: true }),
      username: 'Admin',
    }

    res
      .status(HTTP_REQUEST_CODES.OK)
      .json({ msg: MESSAGES.LOGIN_SUCCESSFUL, user })
  } catch (error) {
    console.log(error)
    res
      .status(HTTP_REQUEST_CODES.SERVER_ERROR)
      .json({ msg: MESSAGES.GENERAL_ERROR_MESSAGE })
  }
}
