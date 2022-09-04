import mongoose from "mongoose";
const {Schema} = mongoose


const blogSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    imageCover:{
        type:String,
        require: true,
    },
    author: {
        type: String,
        require: true
    },
    des: {
        type: String,
        require: true,
    },
    title1: {
        type: String,
       
    },
    title2: {
        type: String,
       
    },
    title3: {
        type: String,
        
    },
    title4: {
        type: String,
       
    },
    title5: {
        type: String,
       
    },
    title6: {
        type: String,
        
    },
    title7: {
        type: String,
        
    },
    inforTitle1: {
        type: String,   
    },
    inforTitle2: {
        type: String,   
    },
    inforTitle3: {
        type: String,   
    },
    inforTitle4: {
        type: String,   
    },
    inforTitle5: {
        type: String,   
    },
    inforTitle6: {
        type: String,   
    },
    inforTitle7: {
        type: String,   
    },
    image1:{
        type: String,
    },
    image2:{
        type: String,
    },
    image3:{
        type: String,
    },
    image4:{
        type: String,
    },
    image5:{
        type: String,
    },
    image6:{
        type: String,
    },
    image7:{
        type: String,
    },
    commentBlog: {
        type: Array
    },
    
}, {timestamps: true});

export default mongoose.model('Blog', blogSchema)

