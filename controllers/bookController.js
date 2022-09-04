import Book from "../models/bookModel.js"

import User from "../models/userModel.js"
export const createBook = async (req, res) =>{
    try {
        const findName = await Book.findOne({name: req.body.name})
        if(findName){
            res.status(500).send("Dữ liệu bị trùng")
        }
        const newBook = await Book.create({
            name: req.body.name,
            img: req.body.img,
            cate: req.body.cate,
            price: req.body.price,
            author: req.body.author,
            des: req.body.des,
            rate: req.body.rate,
            comment: [
                {
                    nameuser: '',
                    imgUser: '',
                    textComment: '',
                    rate: 0
                }
            ]
        })
        res.status(200).json(newBook) 
    } catch (error) {
      throw new Error('Somthing wrong')
    }
}


export const getOneBook = async (req, res) =>{
    try {
        const book =  await Book.findById({_id: req.params.id})
        res.status(200).json(book)
     } catch (error) {
         res.status(404).send("Khong có dữ liệu")
     }
}

export const getAllBook = async (req, res) =>{
    try {
        const books =  await Book.find()
        res.status(200).json(books)
     } catch (error) {
         console.log(error)
     }
}

export const updateBook = async (req, res) =>{
    try {
        const bookUpdate = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!bookUpdate){
            res.status(400).send("Không tìm thấy")
        }
        res.status(200).send(bookUpdate)
    } catch (error) {
        res.status(500).send(error)
    }
}
export const deleteBook = async (req, res) =>{
    try {
        await Book.findByIdAndDelete({_id: req.params.id})
        res.status(200).send("Delete sucsess!")
    } catch (error) {
        throw new Error('Somthing wrong')
    }
}

export const commentBook = async(req,res) =>{
    const { commentData, rateComment, name} = req.body
        const checkBook = await Book.findOne({slug: req.params.slug})
        const checkUser = await User.findOne({_id: req.params.userId})
        if(!checkUser){
            res.status(500)
            throw new Error("Không tìm thấy user")
        }
        if(!checkBook){
            res.status(500)
            throw new Error("Không tìm thấy sách bình luận")
        }
        const commentBook = await Book.updateOne({slug: req.params.slug}, 
            {$push: {
                comment: {
                    name: name, 
                    commentData: commentData,
                    rate: rateComment,
                    like: 0,
                    repComment: [],
                    time: new Date().toLocaleDateString('en-us', 
                    { weekday:"long", year:"numeric", month:"short", day:"numeric"})
                }
            }}
        )

        res.status(200).json(commentBook)
}
