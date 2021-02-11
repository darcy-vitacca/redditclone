import 'reflect-metadata';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config()

import authRoutes from './routes/auth'
import postRoutes from './routes/post'
import subRoutes from './routes/subs'

import express from 'express'
import morgan from 'morgan'
import trim from './middlware/trim'

const app = express()
const PORT = process.env.PORT



//to parse the json data
app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())

app.get('/', (_, res) => res.send('Hello World'))
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/subs', subRoutes)

app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`)
    try {
        await createConnection()
        console.log('Database connected')
    } catch (err) {
        console.log(err)
    }
})