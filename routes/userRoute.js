import express from "express"
import { register, login, getAllUser, deleteUser, updateUser } from "../controllers/userController.js"


const route = express.Router()

// register
route.post('/register', register)

// login
route.post("/login", login)

// get all user
route.get("/", getAllUser)

// delete user
route.delete("/:id", deleteUser)

// update user
route.put('/:id', updateUser)
export default route