import { Product } from '@utils/types'
import { Schema, models, model } from 'mongoose'

const ProductSchema = new Schema<Product>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    items: {
      benefits: [String],
      ingredients: [String],
      dosage: [String],
      packSize: String,
    },
  },
  { timestamps: true }
)

const ProductModel = models.Product || model('Product', ProductSchema)

export default ProductModel
