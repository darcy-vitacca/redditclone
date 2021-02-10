import "reflect-metadata";
import { createConnection } from "typeorm";

import express from 'express'
import morgan from 'morgan'

const app = express()

//to parse the json data
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_, res) => res.send("Hello World"))

app.listen(5000, async () => {
    console.log("server running at http://localhost:5000")
    try {
        await createConnection()
        console.log('Database connected')
    } catch (err) {
        console.log(err)
    }
})