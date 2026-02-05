const trainerRequestModel = require('../models/trainerRequestModel')
const TrainerRequest =require('../models/trainerRequestModel')
const User=require("../models/userModel")

exports.sendTrainerRequest=async(req,res)=>{
    const trainerId=req.body.trainerId

    const userId=req.id
    try {
        const exists=await TrainerRequest.findOne({
        user:userId,
        trainer:trainerId,
    })
    console.log(exists);
    
    if(exists){
       return res.status(401).json("Request already send")
    }

    await TrainerRequest.create({
        user:userId,
        trainer:trainerId
    })
    res.status(200).json("Trainer Request Send")
    } catch (err) {
        res.status(500).json("error"+err)
    }


}

exports.viewTrainerRequests=async(req,res)=>{
    const trainerId=req.id
    console.log(trainerId);
    
    try {
        const requests=await TrainerRequest.find({
        trainer:trainerId
    })
    .populate("user", "username email profile");
    return res.status(200).json(requests)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.acceptTrainerRequest=async(req,res)=>{
    
    const requestId=req.body.requestId
    console.log(req.body);
    try {
        const result=await trainerRequestModel.findByIdAndUpdate(requestId,
        {status:"accepted"},
        {new:true}
    )
    console.log(result);
   return  res.status(200).json({message:"Request accepted",result})
    
    
    } catch (err) {
        res.status(500).json("error"+err)
    }

}
exports.declineTrainerRequest=async(req,res)=>{
    
    const requestId=req.body.requestId
    console.log(req.body);
    try {
        const result=await trainerRequestModel.findByIdAndDelete(requestId,
        {status:"rejected"},
        {new:true}
    )
   return  res.status(200).json({message:"Request rejected",result})
    } catch (err) {
        res.status(500).json("error"+err)
    }

}

exports.viewMyClients=async(req,res)=>{
    const trainerId=req.id

    try {
        const result=await trainerRequestModel.find({
        trainer:trainerId,
        status:"accepted"
    }).populate("user", "username email profile");
    res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

exports.getTrainerDashboardStatus=async(req,res)=>{
    console.log("inside dashboard Status");
    
    const trainerId=req.id

    try {
        const pendingRequests=await trainerRequestModel.countDocuments({
            trainer:trainerId,
            status:'pending'
        })

        const totalClients=await trainerRequestModel.countDocuments({
            trainer:trainerId,
            status:"accepted"
        })
        res.status(200).json({pendingRequests,totalClients})
        
    } catch (err) {
        res.status(500).json(err)
        
    }
}