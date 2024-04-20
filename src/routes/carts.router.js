import { Router } from "express"
import CartManager from "../components/CartManager.js"

const cartsRouter = Router()
const cartManager = new CartManager('./src/data/carts.json')

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid)

        if (isNaN(cid)) {
            return res.status(400).send({ error: 'El id no es un número' })
        }

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
        res.status(201).json({ message: `Carrito creado con id: ${newCart.id}` })
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al crear el carrito', message: error.message })
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid)
        const pid = parseInt(req.params.pid)

        if (isNaN(cid) || isNaN(pid)) {
            return res.status(400).json({ error: 'El id no es un número' })
        }

        const addToCart = await cartManager.addProductToCart(cid, pid)

        if (!addToCart) {
            return res.status(404).send({ error: `No se encontró ningún carrito con el id ${cid}.` })
        }

        res.json({ message: `Se agregó el producto ${pid} al carrito ${cid}` })
    }
    catch (error){
        res.status(500).json({ error: 'Ocurrió un error al agregar el producto al carrito', message: error.message })

    }
})

export default cartsRouter