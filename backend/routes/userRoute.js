const express = require('express')
const{ login , register ,getUserProfile} = require('../controllers/userController.js')
const { auth } = require('../middleware/authMiddleware.js')

const userRouter = express.Router()

userRouter.post('/register' , register)
userRouter.post('/login' , login)
userRouter.get('/me', auth, getUserProfile);


module.exports = userRouter