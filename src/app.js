import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import __dirname from './utils.js'
import socketProducts from './listener/socketProducts.js'
import socketChat from './listener/socketChat.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, console.log(`Server running on: http://localhost:${PORT}`))

const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set("view engine", "handlebars")

const environment = async () => {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => { console.log("Connected to database") })
        .catch(error => console.error("Failed to connect to database", error))
}

environment()

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

socketProducts(socketServer)
socketChat(socketServer)