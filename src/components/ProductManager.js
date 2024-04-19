import { promises as fs } from 'fs'

export default class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(product) {
        const { code } = product
        const products = await this.getProductsFromFile()

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error('Faltan campos obligatorios en el producto. No se puede agregar el producto.')
            return
        }

        const existingProduct = products.find(product => product.code === code)
        if (existingProduct) {
            console.error(`Ya existe un producto con el mismo código "${code}". No se puede agregar el producto.`)
            return
        }

        const newProduct = {
            id: this.getNextId(products),
            ...product
        }
        products.push(newProduct)
        this.saveProductsToFile(products)
        console.log(`Se agregó correctamente el producto con el código "${code}".`)
    }


    async getProducts() {
        return await this.getProductsFromFile()
    }

    async getProductById(id) {
        try {
            const products = await this.getProductsFromFile()
            const product = products.find(product => product.id === id)
            if (!product) {
                return { error: `No se encontró ningún producto con el id ${id}.` }
            }
            return product
        } catch (error) {
            console.error(error)
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const products = await this.getProductsFromFile()
            const index = products.findIndex(product => product.id === id)

            if (updatedFields.hasOwnProperty('id')) {
                return { error: 'No se puede actualizar el id de un producto' }
            }

            if (index !== -1) {
                products[index] = {
                    ...products[index],
                    ...updatedFields
                }
                this.saveProductsToFile(products)
                console.log(`Se actualizó el producto`)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProductsFromFile()
            const index = products.findIndex(product => product.id === id)
            if (index === -1) {
                console.error(`No se encontró ningún producto con el id ${id}`)
            }
            else {
                products.splice(index, 1)
                this.saveProductsToFile(products)
                console.log(`Se eliminó correctamente el producto con el id ${id}`)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getProductsFromFile() {
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