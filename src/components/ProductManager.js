import { promises as fs } from 'fs'

export default class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(product) {
        const { code } = product
        const products = await this.getProducts()

        const existingProduct = products.find(item => item.code === code)
        if (existingProduct) {
            return false
        }

        const newProduct = {
            id: this.getNextId(products),
            ...product
        }
        products.push(newProduct)
        this.saveProductsToFile(products)
        return true
    }

    async getProductById(id) {
        const products = await this.getProducts()
        const product = products.find(product => product.id === id)
        if (!product) {
            return null
        }
        return product
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === id)
        if (index !== -1) {
            const updatedProduct = {
                ...products[index],
                ...updatedFields
            }

            if (updatedFields.hasOwnProperty('id')) {
                updatedProduct.id = products[index].id;
                return false
            }

            products[index] = updatedProduct;
            this.saveProductsToFile(products)

            return true
        }
        else {
            return null
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === id)
        if (index === -1) {
            return null
        }
        else {
            products.splice(index, 1)
            await this.saveProductsToFile(products)
            return true
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                console.error(error)
            }
        }
    }

    async saveProductsToFile(products) {
        const data = JSON.stringify(products, null, 2)
        await fs.writeFile(this.path, data)
    }

    getNextId(products) {
        if (products.length === 0) {
            return 1
        }
        const maxId = Math.max(...products.map(product => product.id))
        return maxId + 1
    }
}