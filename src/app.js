import express, { json, urlencoded } from 'express'
import ProductManager from './components/ProductManager.js'

const app = express()
const PORT = 8080

app.use(json())
app.use(urlencoded({extended:true}))

const productos = new ProductManager('productos.json')

app.get('/', (req, res) => {
    res.send(`Product Manager`)
})

app.get('/products', async (req, res) => {
    const limit = Number(req.query.limit)
    const readProducts = await productos.getProductsFromFile()
    const productsLimit = readProducts.slice(0, limit)

    if (!limit) {
        return res.json(readProducts)
    }

    res.json(productsLimit)
})

app.get('/products/:pid', async (req, res) => {
    let pid = Number(req.params.pid)
    if (isNaN(pid)) return res.json({ error: 'El id no es un número' })
    res.json(await productos.getProductById(pid))
})


app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`))