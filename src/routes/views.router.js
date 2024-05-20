import { Router } from "express"
//import ProductManager from '../dao/managers/fsmanagers/ProductManager.js'
import ProductManager from '../dao/managers/mongomanagers/mongoProductManager.js'
import { generateLink } from '../utils.js'

const viewsRouter = Router()
//const productManager = new ProductManager(__dirname + '/dao/managers/fsmanagers/data/products.json')

const productManager = new ProductManager()

viewsRouter.get('/products', async (req, res) => {
    try {
        const { limit, sort, query, page } = req.query
        const readProducts = await productManager.getProducts(limit, page, sort, query)

        const { products, totalProducts, totalPages, currentPage } = readProducts

        const hasPrevPage = currentPage > 1
        const hasNextPage = currentPage < totalPages

        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push({
                pageNumber: i,
                isCurrent: i === currentPage,
                pageLink: generateLink('products', i, sort, limit, query)
            })
        }

        res.render('home', {
            readProducts: products,
            totalProducts,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? generateLink('products', currentPage - 1, sort, limit, query) : null,
            nextLink: hasNextPage ? generateLink('products', currentPage + 1, sort, limit, query) : null,
            ascLink: generateLink('products', 1, 'asc', limit, query),
            descLink: generateLink('products', 1, 'desc', limit, query),
            pages,
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