import express, { urlencoded } from 'express'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json({limit : '16kb'}))
app.use(express.urlencoded({extended: true, limit : '16kb'}))


// routes import
import routerHealth from './routes/Register.routes.js'

// rute declaration
app.use("/api/v1/users", routerHealth)

export default app