import mongoose from "mongoose";
const {Schema} = mongoose
import { CommentBook } from "./commentModel.js";

const bookSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    img:{
        type:String,
        require: true,
    },
    cate: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true
    },
    author: {
        type: String
    },
    des: {
        type: String
    },
    rate: {
        type: Number,
        default: 0
    },
    comment:[CommentBook],

});

export default mongoose.model('Book', bookSchema)

