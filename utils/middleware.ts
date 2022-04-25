import { NextApiRequest, NextApiResponse } from 'next'
import { verifyToken } from './index'
import { HTTP_REQUEST_CODES, MESSAGES } from './constants'
export const userRequired = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const headers = req.headers
  const authorization = headers['authorization'] as string
  if (!authorization) {
    res
      .status(HTTP_REQUEST_CODES.UNAUTHORIZED)
      .json({ msg: MESSAGES.NO_ACCESS_TO_ROUTE })
    return
  }
  const token = authorization.split(' ')[1] || ''
  try {
    const data = verifyToken(token)
    const isAdmin = (data as any)?.isAdmin || false
    return isAdmin
  } catch (error) {
    res
      .status(HTTP_REQUEST_CODES.BAD_REQUEST)
      .json({ msg: MESSAGES.BAD_REQUEST_TOKEN })
    return
  }
}
