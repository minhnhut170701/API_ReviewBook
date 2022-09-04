import express from "express"
import Book from "../models/bookModel.js"
import Comment from "../models/commentModel.js"
import User from "../models/userModel.js"

const route = express.Router()
// get all
route.get("/:slug/:idComment", async(req,res) =>{
    await Book.findOne({slug: req.params.slug}, (err, parent) => {
        try {
            const comment = parent.comment.id(req.params.idComment);
            if(!comment){
                res.status(400)
                throw new Error("Không tìm thấy comment")
            }
            res.status(200).json(comment)
        } catch (error) {
            res.status(500)
            throw new Error("Khong thể lấy dữ liệu comment")
        }
    }).clone()
})

// add like
route.put('/:userId/:slug/:idComment', async(req,res) =>{
    const findUser = await User.findById(req.params.userId)
    if(!findUser){
        res.status(500)
        throw new Error("Khong tìm thấy user")
    }
    else{
        await Book.findOne({slug: req.params.slug},(err, parent) => {
            try {
               
                if(findUser.username && parent.comment.id(req.params.idComment).like < 0 ){
                    parent.comment.id(req.params.idComment).like = 0
                }
                else if(findUser.username && parent.comment.id(req.params.idComment).like == 0){
                    parent.comment.id(req.params.idComment).like +=  1
                   
                }
                else if(findUser.username &&parent.comment.id(req.params.idComment).like == 1){
                    parent.comment.id(req.params.idComment).like = 0
                   
                }
                    parent.markModified('comment'); 
                    parent.save(function(saveerr, saveresult) {
                        if (!saveerr) {
                        res.status(200).send(saveresult);
                        } else {
                        res.status(400).send(saveerr.message);
                        }
                    });
            } catch (error) {
                res.status(500)
                throw new Error(error)
            }
        }).clone()
    }
    
})
// delete like




export default route

