const express=require('express')

const userController=require('../Controllers/userController')
const postController=require('../Controllers/postController')
const jwtMiddleware=require('../middleware/jwtMiddleware')
const multerConfig=require('../middleware/multeMiddleware')
const route=express.Router()

// register
route.post('/api/register',userController.userRegister)
route.post('/api/login',userController.userLogin)
route.post('/api/googleLogin',userController.googleLogin)
route.get('/api/getUser',jwtMiddleware,userController.getUser)
route.put('/api/update-user',jwtMiddleware,multerConfig.single('profile'),userController.updateUser)
route.get('/api/all-users',jwtMiddleware,userController.getUsers)
route.get('/api/all-trainers',jwtMiddleware,userController.getTrainers)




module.exports=route