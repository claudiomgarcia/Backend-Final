import { Router } from 'express'
import { productManager } from '../app.js'


const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const readProducts = await productManager.getProducts()
        const productsLimit = readProducts.slice(0, limit)

        if (!limit) {
            return res.json(readProducts)
        }

        res.json(productsLimit)
    } catch (error) {
        console.log(error);
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
            return res.status(404).json({ error: `No se encontró ningún producto con el id ${pid}.` });
        }
        res.json(await productManager.getProductById(pid))
    } catch (error) {
        console.log(error);
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body

        if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) {
            res.status(400).json({ error: 'Faltan campos obligatorios en el producto.' })
        }

        const createProduct = await productManager.addProduct(product)

        if (createProduct === false) {
            return res.status(400).json({ error: `Ya existe un producto con el código "${product.code}".` });
        }

        res.json({ message: `Se agregó correctamente el producto con el código "${product.code}".` });

    } catch (error) {
        console.log(error);
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const fields = req.body

        if (isNaN(pid)) {
            return res.status(400).json({ error: 'El id no es un número' });
        }

        const product = await productManager.updateProduct(pid, fields)

        if (product === false) {
            return res.status(400).json({ error: `No se puede modificar el ID del producto` });
        }

        if (!product) {
            return res.status(404).json({ error: `No se encontró ningún producto con el id ${pid}` });
        }

        res.status(200).json({ message: `Se actualizó el producto ${pid}` });


    } catch (error) {

    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const pid = Number(req.params.pid)
        const product = await productManager.deleteProduct(pid);

        if (isNaN(pid)) {
            return res.status(400).json({ error: 'El id no es un número' });
        }

        if (!product) {
            return res.status(404).json({ error: `No se encontró ningún producto con el id ${pid}` });
        }

        res.json({ message: `Se eliminó correctamente el producto con el id ${pid}` });

    } catch (error) {

    }
})

export default productsRouter