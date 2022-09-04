import User from "../models/userModel.js"
// var bcrypt = require('bcryptjs');
import bcrypt from "bcryptjs"
export const register = async (req,res) =>{
    const {username, email, password} = req.body
    
    const checkUserName = await User.findOne({username})
    
    if(!username || !email || !password){
        res.status(400)
        throw new Error('Vui lòng điền đầy dủ')
    }

    if(checkUserName){
        res.status(500)
        throw new Error('Tài khoản đã tồn tại')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const register = await User.create({
        username,
        email,
        password: hash
    })

    if(register){
        res.status(200).json({
            username
        })
    }
    else{
        res.status(400)
        throw new Error('Đăng ký thất bại')
    }
}


export const login = async (req,res) =>{
    const {username, password} = req.body
    try {
        const userCheck = await User.findOne({username})
        if(!userCheck){
            res.status(500)
            throw new Error("Không tồn tại tài khoản")
        }
       const isPassword = await bcrypt.compare(password, userCheck.password)
    
       if(!isPassword){
        res.status(500).send("Tài khoản hoặc mật khẩu không đúng")
       
       }

       res.status(200).json(userCheck)
        
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getAllUser = async(req,res) =>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteUser = async(req,res) =>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send("Xóa thành công")
        
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
    
}

export const updateUser = async(req, res) =>{
    try {
       const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
       if(!user){
        res.status(500)
        throw new Error("Không tìm thấy user")
       }
       res.status(200).json(user)
    } catch (error) {
        res.status(500)
        throw new Error("Sai ở đâu đó, không thể tìm user")
    }
}