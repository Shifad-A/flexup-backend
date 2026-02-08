const express=require('express')

const userController=require('../Controllers/userController')
const postController=require('../Controllers/postController')
const trainerRequestController=require('../Controllers/trainerRequestController')
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
route.post('/api/trainer-request',jwtMiddleware,trainerRequestController.sendTrainerRequest)
route.get('/api/get-trainerRequests',jwtMiddleware,trainerRequestController.viewTrainerRequests)
route.put('/api/trainer/request-accept',jwtMiddleware,trainerRequestController.acceptTrainerRequest)
route.put('/api/trainer/request-reject',jwtMiddleware,trainerRequestController.declineTrainerRequest)
route.get('/api/get-myClients',jwtMiddleware,trainerRequestController.viewMyClients)
route.get('/api/get-dashStatus',jwtMiddleware,trainerRequestController.getTrainerDashboardStatus)
route.post('/api/post',jwtMiddleware,multerConfig.single('image'),postController.createPost)
route.get('/api/get/post',postController.getAllPosts)
route.put('/api/likes/:id',jwtMiddleware,postController.likeDislikePost)


module.exports=route