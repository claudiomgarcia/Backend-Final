import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    thumbnail: { type: Array, default: [], require: false },
    code: { type: String, unique: true, require: true },
    status: { type: Boolean, require: true },
    stock: { type: Number, require: true }
})

export default mongoose.model('products', productsSchema)