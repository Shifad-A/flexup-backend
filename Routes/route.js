const express=require('express')

const userController=require('../Controllers/userController')
const route=express.Router()

// register
// route.post('/api/register',userContoller.userRegister)
route.post('/api/register',userController.userRegister)
route.post('/api/login',userController.userLogin)


module.exports=route