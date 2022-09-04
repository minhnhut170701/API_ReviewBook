import express from "express"
import Book from "../models/bookModel.js"
import {createBook, getAllBook,getOneBook, updateBook, deleteBook, commentBook} from "../controllers/bookController.js"
const route = express.Router()

// get all
route.get("/", getAllBook)
// get one
route.get("/:id", getOneBook)

// create 
route.post("/", createBook)

// delete
route.delete('/:id', deleteBook)


// update
route.put('/:id', updateBook)

//comment
route.post('/:slug/:userId', commentBook)



export default route

