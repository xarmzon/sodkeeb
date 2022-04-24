import mongoose, { Model } from 'mongoose'
import { PER_PAGE } from './constants'
import { IPagingData } from './types'

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected')
    return
  }
  const db = await mongoose.connect(
    process.env.DATABASE_URI || 'mongodb://localhost:27017/sodkeeb'
  )
  console.log('Database connected.....')
  return db
}

export const getPagination = (page?: number, size?: number) => {
  const limit = size ? +size : PER_PAGE
  const offset = page && page > 1 ? (page - 1) * limit : 0 * PER_PAGE

  return { limit, offset }
}

export const getCustomPaginationData = async <T>(
  pipeline: any[],
  model: Model<any, {}, {}>,
  page: number = 1,
  perPage: number = PER_PAGE
): Promise<IPagingData<T>> => {
  const { limit, offset } = getPagination(page, perPage)

  const countPipeline = [
    ...pipeline,
    {
      $count: 'totalItems',
    },
  ]

  pipeline.push({ $skip: offset }, { $limit: limit })

  const results = await model.aggregate(pipeline).exec()
  const resultsCount = await model.aggregate(countPipeline).exec()
  const totalItems = resultsCount[0]?.totalItems
    ? resultsCount[0]?.totalItems
    : 0
  const totalPages = Math.ceil(totalItems / limit)
  return {
    results,
    paging: {
      totalPages,
      page: page ? (page < 1 ? 1 : page) : 1,
      totalItems,
      perPage: perPage ? perPage : PER_PAGE,
    },
  }
}
