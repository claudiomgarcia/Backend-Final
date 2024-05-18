import cartsModel from '../../models/carts.model.js'

export default class CartManager {

    async createCart() {
        try {
            const cartData = {}
            return await cartsModel.create(cartData)
        } catch (error) {
            throw error
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const updatedCart = await cartsModel.findOneAndUpdate(
                { _id: cid, "products.product": pid },
                { $inc: { "products.$.quantity": 1 } },
                { new: true }
            )

            if (!updatedCart) {
                const cart = await cartsModel.findById(cid)
                cart.products.push({ product: pid })
                await cart.save()
            }
        } catch (error) {
            throw error
        }
    }

    async getCarts() {
        try {
            return await cartsModel.find()
        } catch (error) {
            throw error
        }
    }


    async getCartById(cid) {
        try {
            return await cartsModel.findById(cid).populate('products.product')
        } catch (error) {
            throw error
        }
    }

}