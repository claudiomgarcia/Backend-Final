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

    async getProducts(limit, page, sort, query) {
        try {
            const filter = query ? { category: query } : {}
            const options = {
                limit: parseInt(limit) || 10,
                page: parseInt(page) || 1,
                sort: (sort === 'asc' || sort === 'desc') ? { price: sort === 'asc' ? 1 : -1 } : {}
            }
            const products = await productsModel.paginate(filter, { ...options, lean: true })

            return {
                products: products.docs,
                totalProducts: products.totalDocs,
                totalPages: products.totalPages,
                currentPage: products.page
            }

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


