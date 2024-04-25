import { Router } from "express"
import ProductManager from '../components/ProductManager.js'
import __dirname from '../utils.js'

const viewsRouter = Router()
const productManager = new ProductManager(__dirname + '/data/products.json')

const readProducts = await productManager.getProducts()

viewsRouter.get('/', async (req, res) => {
    res.render('home', { readProducts, title: "Todos los productos" })
})

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { title: "Productos en tiempo real" })
})

export default viewsRouter