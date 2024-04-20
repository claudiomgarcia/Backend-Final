import express from 'express'
import ProductManager from './components/ProductManager.js'
import productsRouter from './routes/products.router.js'

const app = express()
const PORT = 8080

export const productManager = new ProductManager('./products.json')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productsRouter)



app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`))