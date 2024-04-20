import { promises as fs } from 'fs'

export default class CartManager {
    constructor(path) {
        this.path = path
    }

    async createCart() {
        try {
            const carts = await this.getCartsFromFile()
            const newCart = {
                id: this.getNextId(carts),
                products: []
            }

            carts.push(newCart)
            await this.saveCartsToFile(carts)
            return newCart
        } catch (error) {
            throw error
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const carts = await this.getCartsFromFile()
            const cart = carts.find(cart => cart.id === cid)

            if (cart === undefined) {
                return null
            }

            const existingProduct = cart.products.find(product => product.id === pid)

            if (existingProduct) {
                existingProduct.quantity += 1
            } else {
                cart.products.push({ id: pid, quantity: 1 })
            }

            await this.saveCartsToFile(carts)
            return cart
        }
        catch (error) {
            throw error
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCartsFromFile()
            const cart = carts.find(cart => cart.id === id)
            if (!cart) {
                return null
            }
            return cart
        } catch (error) {
            throw error
        }
    }

    async getCartsFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf8')
            return data ? JSON.parse(data) : []
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }

    async saveCartsToFile(carts) {
        try {
            const data = JSON.stringify(carts, null, 2)
            await fs.writeFile(this.path, data, 'utf8')
        } catch (error) {
            throw error
        }
    }

    getNextId(carts) {
        if (carts.length === 0) {
            return 1
        }
        const maxId = Math.max(...carts.map(cart => cart.id))
        return maxId + 1
    }


}