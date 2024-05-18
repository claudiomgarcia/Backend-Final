import productsModel from "../../models/products.model.js"

export default class ProductManager {

    async addProduct(product) {
        try {
            const { code } = product
            const existingProduct = await productsModel.findOne({ code })

            if (existingProduct) {
                return false
            }

            const newProduct = await productsModel.create(product)
            return newProduct

        } catch (error) {
            throw error
        }
    }

    async getProducts(limit) {
        try {
            const products = await productsModel.find().lean()

            return limit ? products.slice(0, limit) : products
        } catch (error) {
            throw error
        }
    }

    async getProductById(id) {
        try {
            return await productsModel.findById(id)
        } catch (error) {
            throw error
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            return await productsModel.findByIdAndUpdate(id, { $set: updatedFields });
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            return await productsModel.findByIdAndDelete(id)
        } catch (error) {
            throw error
        }
    }

}


