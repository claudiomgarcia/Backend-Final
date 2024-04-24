import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set("view engine", "handlebars")

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)



app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`))