import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose"
import bookRoute from "./routes/bookRoute.js"
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js"
import cors from "cors"
import {errorHandler} from "./utils/middlewareError.js"

dotenv.config()

const connectDB =  async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db connect')
    } catch (error) {
        console.log(error)
    }
}
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const db = process.env.MONGO || 'test'



// middleware
app.use('/api/book', bookRoute)
app.use('/api/book/comment', commentRoute)
app.use('/api/user', userRoute)
app.use('/api/blog', blogRoute)
app.use(errorHandler)
app.listen(3001 || process.env.PORT, () =>{
    console.log('Server is running')
})


