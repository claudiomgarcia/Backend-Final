import { Router } from "express"
import CartManager from "../dao/managers/mongomanagers/mongoCartManager.js"
import __dirname from "../utils.js"

const cartsRouter = Router()
const cartManager = new CartManager()

cartsRouter.get('/', async (req, res) => {
    try {
        const cart = await cartManager.getCarts()

        res.json(cart)
    } catch (error) {
        throw error
    }

})

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid
        const cart = await cartManager.getCartById(cid)

        if (!cart) {
            return res.status(404).send({ error: `No se encontró ningún carrito con el id ${cid}.` })
        }

        res.json(cart)
    }
    catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener el carrito', message: error.message })
    }
})

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json({ message: `Carrito creado con id: ${newCart._id}` })
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al crear el carrito', message: error.message })
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        await cartManager.addProductToCart(cid, pid)

        // if (addToCart === null) {
        //     return res.status(404).send({ error: `No se encontró ningún carrito con el id ${cid}.` })
        // }

        // if (addToCart === false) {
        //     return res.status(404).send({ error: `No se encontró ningún producto con el id ${pid}.` })
        // }

        res.json({ message: `Se agregó el producto ${pid} al carrito ${cid}` })
    }
    catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al agregar el producto al carrito', message: error.message })

    }
})

cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        await cartManager.deleteProductInCart(cid, pid)

        res.json({ message: `Se eliminó el producto ${pid} del carrito ${cid}` })

    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el producto', message: error.message })
    }

})

cartsRouter.put('/:cid', async (req, res) => {

})

cartsRouter.put('/:cid/products/:pid', async (req, res) => {

})

cartsRouter.delete('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid

        await cartManager.deleteAllProducts(cid)

        res.json({ message: `Se eliminaron todos los productos del carrito ${cid}` })

    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar los productos', message: error.message })
    }
})

export default cartsRouter