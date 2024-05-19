import { Router } from "express"
//import ProductManager from '../dao/managers/fsmanagers/ProductManager.js'
import ProductManager from '../dao/managers/mongomanagers/mongoProductManager.js'
import __dirname from '../utils.js'

const viewsRouter = Router()
//const productManager = new ProductManager(__dirname + '/dao/managers/fsmanagers/data/products.json')

const productManager = new ProductManager()

viewsRouter.get('/', async (req, res) => {
    try {
        const { limit, sort, query } = req.query
        const page = parseInt(req.query.page)
        const readProducts = await productManager.getProducts(limit, page, sort, query)

        const { products, totalProducts, totalPages, currentPage } = readProducts

        const hasPrevPage = currentPage > 1
        const hasNextPage = currentPage < totalPages

        const prevLink = hasPrevPage ? `/?page=${currentPage - 1}` : null
        const nextLink = hasNextPage ? `/?page=${currentPage + 1}` : null

        res.render('home', {
            readProducts: products,
            totalPages,
            totalProducts,
            currentPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
            title: "Todos los productos"
        })

    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los productos.', message: error.message })
    }

})

viewsRouter.get('/realtimeproducts', (req, res) => {
    try {
        res.render('realTimeProducts', { title: "Productos en tiempo real" })
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los productos.', message: error.message })
    }

})

viewsRouter.get('/chat', (req, res) => {
    res.render('chat', { title: "Chat" })
})

export default viewsRouter