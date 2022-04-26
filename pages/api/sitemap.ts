import { NextApiRequest, NextApiResponse } from 'next'
import { TProductItem } from '@utils/types'
import ProductModel from '@models/ProductModel'
import { connectDB } from '@utils/database'

const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectDB()

  try {
    const allProducts = await ProductModel.find({})

    const links = allProducts.map((product: TProductItem) => ({
      url: `/product/${product.slug}`,
      changefreq: 'daily',
      priority: 0.9,
    }))

    const stream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    })

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data: any) => data.toString())

    res.end(xmlString)
  } catch (err) {
    console.log(err)
    res.send(JSON.stringify(err))
  }
}

export default handler
