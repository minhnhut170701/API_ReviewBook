import mongoose from "mongoose";
import { UserName } from "./userModel.js";
const {Schema} = mongoose

const commentSchema = new Schema({
    name:{
        type:String,
        require: true,
    },
    commentData:{
        type:String,
        require: true,
    },
    rate: {
        type: String,
        require: true
    },
    like: {
        type: Number,
        default: 0
    },
    repComment: {
        type: Array,
    },
    time: {
       type: String,
       require:true
    }
})

export default mongoose.model('Comment', commentSchema)
export const CommentBook = commentSchema