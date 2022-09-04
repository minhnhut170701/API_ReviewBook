import express from "express"
import Blog from "../models/blogModel.js"
const blogRoute = express.Router()

// get all
blogRoute.get('/', async(req,res) =>{
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
        
    } catch (error) {
       res.status(500)
       throw new Error("Không thể lấy dữ liệu blog") 
    }
})

export default  blogRoute