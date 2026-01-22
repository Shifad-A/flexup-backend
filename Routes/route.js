const express=require('express')

const userController=require('../Controllers/userController')
const postController=require('../Controllers/postController')
const jwtMiddleware=require('../middleware/jwtMiddleware')
const route=express.Router()

// register
// route.post('/api/register',userContoller.userRegister)
route.post('/api/register',userController.userRegister)
route.post('/api/login',userController.userLogin)
route.post('/api/googleLogin',userController.googleLogin)
route.post('/api/post',jwtMiddleware,postController.createPost)



module.exports=route