import mongoose from "mongoose";
import { CommentBook } from "./commentModel.js";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email:{
        type: String,
        require: [true, 'Please Add Email'],
        unique: true,
    },
    password:{
        type: String,
        require: [true, 'Please Add password']
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

export default mongoose.model('User', UserSchema)
export const UserName = UserSchema