import { Router } from "express"
import ProductManager from '../components/ProductManager.js'

const viewsRouter = Router()
const productManager = new ProductManager('./src/data/products.json')

const readProducts = await productManager.getProducts()

viewsRouter.get('/', async (req, res) => {
    res.render('home', { readProducts })
});

export default viewsRouter