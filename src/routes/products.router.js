import { Router } from 'express'
import ProductManager from '../components/ProductManager.js'

const productsRouter = Router()
const productManager = new ProductManager('./src/data/products.json')

productsRouter.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const readProducts = await productManager.getProducts()
        const productsLimit = readProducts.slice(0, limit)

        if (isNaN(limit)) {
            return res.status(400).json({ error: 'El límite proporcionado no es un número' })
        }

        if (!limit) {
            return res.json(readProducts)
        }

        res.json(productsLimit)
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los productos.' })
        console.log(error)
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const product = await productManager.getProductById(pid)

        if (isNaN(pid)) {
            return res.status(400).json({ error: 'El id no es un número' })
        }

        if (!product) {
            return res.status(404).json({ error: `No se encontró ningún producto con el id ${pid}.` })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener el producto.' })
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body
        product.status = true

        if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) {
            res.status(400).json({ error: 'Faltan campos obligatorios en el producto.' })
        }

        const createProduct = await productManager.addProduct(product)

        if (createProduct === false) {
            return res.status(400).json({ error: `Ya existe un producto con el código "${product.code}".` })
        }

        res.status(201).json({ message: `Se agregó correctamente el producto con el código "${product.code}".` })

    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al agregar el producto.' })
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const fields = req.body

        if (isNaN(pid)) {
            return res.status(400).json({ error: 'El id no es un número' })
        }

        const product = await productManager.updateProduct(pid, fields)

        if (product === false) {
            return res.status(400).json({ error: `No se puede modificar el ID del producto` })
        }

        if (!product) {
            return res.status(404).json({ error: `No se encontró ningún producto con el id ${pid}` })
        }

        res.json({ message: `Se actualizó el producto ${pid}` })

    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al actualizar el producto.' })
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const pid = Number(req.params.pid)
        const product = await productManager.deleteProduct(pid)

        if (isNaN(pid)) {
            return res.status(400).json({ error: 'El id no es un número' })
        }

        if (!product) {
            return res.status(404).json({ error: `No se encontró ningún producto con el id ${pid}` })
        }

        res.json({ message: `Se eliminó correctamente el producto con el id ${pid}` })

    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al intentar eliminar el producto.' })
    }
})

export default productsRouter